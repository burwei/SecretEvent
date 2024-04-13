import { makeAutoObservable, runInAction } from 'mobx'
import { wallet } from '@cityofzion/neon-js'
import { walletApi } from '@/api/wallet'
import { foreHash, collateralToken, baseConfig } from './constant'
import { df } from '@/utils/format'
import { yeqn } from '@/utils/calc'
import { modalStore, marketStore } from '@/store'

class Wallet {
  walletName = 'Neoline'
  network = ''
  address = 'Connect Wallet'
  addressHash = ''
  balance = {}

  constructor() {
    makeAutoObservable(this)
  }

  set = (value) => Object.entries(value).forEach(([key, val]) => (this[key] = val))
  setWalletName = (walletName) => (this.walletName = walletName)
  setNetwork = (network) => (this.network = network)
  setAddress = (address) => {
    if (address) {
      this.address = address
      if (address !== 'Connect Wallet') this.addressHash = `0x${wallet.getScriptHashFromAddress(address)}`
      else {
        this.addressHash = ''
        runInAction(() => (this.balance = {}))
      }
    } else {
      this.address = 'Connect Wallet'
      this.addressHash = ''
      runInAction(() => (this.balance = {}))
    }
  }
  getBalance = () => walletApi[this.walletName].getBalance()

  check = async (method, args) => {
    const { market, balance } = marketStore
    if (this.address === 'Connect Wallet') return Promise.reject(['warn', 'Please connect wallet first!'])
    // dueTimeStampMilliseconds
    switch (method) {
      case 'winnerRedeem':
        break
      default:
        if (market.dueTimeStampMilliseconds < new Date().getTime())
          return Promise.reject(['warn', 'This propsition has been expired!'])
    }
    //input
    switch (method) {
      case 'buy':
        if (args[1] <= 0) return Promise.reject(['warn', 'Invalid amount!'])
        else if (market.liquidity === 0) return Promise.reject(['warn', 'Insufficient funds!'])
        else if (args[1] > (args[0] ? balance.amountTrue : balance.amountFalse))
          return Promise.reject(['warn', 'Not enough balance!'])
        return Promise.resolve()
      case 'buyOnce':
        if (args[1] <= 0) return Promise.reject(['warn', 'Invalid amount!'])
        else if (market.liquidity === 0) return Promise.reject(['warn', 'Insufficient funds!'])
        else if (args[1] > this.balance[collateralToken.addressHash] ?? 0)
          return Promise.reject(['warn', 'Not enough balance!'])
        return Promise.resolve()
      case 'redeem':
        if (market.liquidity === 0) return Promise.reject(['warn', 'No enough liquidity!'])
        if (Math.min(balance.amountTrue, balance.amountFalse) < args)
          return Promise.reject(['warn', 'Not enough balance!'])
        return Promise.resolve()
      case 'redeemOnce':
        if (market.liquidity === 0) return Promise.reject(['warn', 'No enough liquidity!'])
        return Promise.resolve()
      case 'winnerRedeem':
        if (args === 0) return Promise.reject(['warn', 'Not enough balance!'])
        return Promise.resolve()
      default:
        return Promise.resolve()
    }
  }

  catch = async (err, method) => {
    modalStore.close('wait')
    switch (method) {
      default:
        if (err instanceof Array) modalStore.open(err[0], err[1])
        else if (err.type) modalStore.open('error', err.description)
        else modalStore.open('error', 'Error!')
    }
  }

  buy = async (tokenId, amount) =>
    this.check('buy', [tokenId % 3 === 2, Number(amount)]).then(() =>
      walletApi[this.walletName].buy(tokenId, df(amount, -collateralToken.decimal, 0)),
    )
  buyOnce = async (tokenId, amount = 0) => {
    const {
      market: { liquidityTrue: LT, liquidityFalse: LF },
    } = marketStore
    const a = 1 - baseConfig.fee
    const [l1, l2] = tokenId % 3 === 0 ? [LT, LF] : [LF, LT]
    const [b, c] = [l2 + l1 * a - amount * a, -l2 * amount]
    const deposit = (Math.pow(b ** 2 - 4 * a * c, 0.5) - b) / (2 * a)
    return this.check('buyOnce', [tokenId % 3 === 2, Number(deposit)]).then(() =>
      walletApi[this.walletName].buyOnce(tokenId, df(deposit, -collateralToken.decimal, 0)),
    )
  }
  deposit = async (tokenId, amount) =>
    this.check('deposit').then(() =>
      walletApi[this.walletName].deposit(tokenId, df(amount, -collateralToken.decimal, 0)),
    )
  addLiquidity = async (tokenId, amax, bmax, amin = 0, bmin = 0) => {
    const { market } = marketStore
    bmax ??= df(
      (df(amax, -collateralToken.decimal) * market.liquidityFalseUnformat) / market.liquidityTrueUnformat,
      collateralToken.decimal,
    )
    if (market.liquidity === 0) bmax = amax
    return this.check('addLiquidity').then(() =>
      walletApi[this.walletName].addLiquidity(
        tokenId,
        ...[amax, amin, bmax, bmin].map((v) => df(v, -collateralToken.decimal, 0)),
      ),
    )
  }
  addLiquidityOnce = async (tokenId, amax, bmax) =>
    walletApi[this.walletName].addLiquidityOnce(
      tokenId,
      df(amax, -collateralToken.decimal, 0),
      df(bmax, -collateralToken.decimal, 0),
    )
  removeLiquidity = async (tokenId, amount, tmin = 1, fmin = 1) =>
    this.check('removeLiquidity').then(() =>
      walletApi[this.walletName].removeLiquidity(tokenId, BigInt(amount).toString(), tmin, fmin),
    )
  redeem = async (tokenId, amount) =>
    walletApi[this.walletName].redeem(tokenId, df(amount, -collateralToken.decimal, 0)
    )
  redeemOnce = async () => {
    const {
      market: { liquidityTrue: LT, liquidityFalse: LF },
      balance: { amountTrue: AT, amountFalse: AF, tokenId },
    } = marketStore
    const amount = yeqn(LT, LF, AT, AF)
    return AT === AF
      ? this.redeem(tokenId, AT)
      : this.check('redeemOnce').then(() =>
        walletApi[this.walletName].redeemOnce(
          tokenId + (AT > AF ? 1 : 2),
          df(amount, -collateralToken.decimal, 0),
          df(
            (AT > AF ? AT - amount : AF - amount) - 10 ** (2 - collateralToken.decimal),
            -collateralToken.decimal,
            0,
          ),
        ),
      )
  }
  winnerRedeem = async () => {
    const { market, balance } = marketStore
    const amount = market.winnerTokenType === 'True' ? balance?.amountTrue : balance?.amountFalse
    return this.check('winnerRedeem', amount).then(() =>
      walletApi[this.walletName].winnerRedeem(market.winnerTokenId, df(amount, -collateralToken.decimal, 0)),
    )
  }
}

export default new Wallet()
