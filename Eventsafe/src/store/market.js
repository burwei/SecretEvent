import { makeAutoObservable, runInAction } from 'mobx'
import { traverseiterator, invokeScript } from '@/api/rpcApi'
import { Buffer } from 'buffer'
import { b2i, df } from '@/utils/format'
import { foreHash, collateralTokenMap, collateralToken } from './constant'
import { walletStore } from '@/store'

class Market {
  market = {}
  markets = []
  balance = {}
  balances = []
  statistics = {}

  constructor() {
    makeAutoObservable(this)
  }

  getBalance = async (tokenId) => {
    const addressHash = walletStore.addressHash
    if (addressHash === '' || !tokenId) {
      this.balance = {}
      return Promise.resolve(null)
    }
    return invokeScript([
      {
        operation: 'balanceOf',
        scriptHash: foreHash,
        params: [
          { type: 'Hash160', value: addressHash },
          { type: 'Integer', value: tokenId },
        ],
      },
      {
        operation: 'balanceOf',
        scriptHash: foreHash,
        params: [
          { type: 'Hash160', value: addressHash },
          { type: 'Integer', value: tokenId + 1 },
        ],
      },
      {
        operation: 'balanceOf',
        scriptHash: foreHash,
        params: [
          { type: 'Hash160', value: addressHash },
          { type: 'Integer', value: tokenId + 2 },
        ],
      },
    ]).then(({ stack: [{ value: v0 }, { value: v1 }, { value: v2 }] }) =>
      runInAction(
        () =>
        (this.balance = {
          tokenId,
          liquidity: v0,
          amountTrue: df(v1, collateralToken.decimal),
          amountFalse: df(v2, collateralToken.decimal),
        }),
      ),
    )
  }

  getBalances = async () => {
    const addressHash = walletStore.addressHash
    if (!addressHash) {
      runInAction(() => (this.balances = []))
      return Promise.resolve(null)
    }
    return invokeScript([
      {
        operation: 'tokensOf',
        scriptHash: foreHash,
        params: [{ type: 'Hash160', value: addressHash }],
      },
    ])
      .then(({ stack, session }) => traverseiterator(session, stack[0].id, 100))
      .then((result) => result.map(({ value }) => b2i(value, 'base64')))
      .then((ids) =>
        invokeScript(
          ids.map((id) => ({
            operation: 'balanceOf',
            scriptHash: foreHash,
            params: [
              { type: 'Hash160', value: addressHash },
              { type: 'Integer', value: id },
            ],
          })),
        ).then(({ stack }) =>
          stack.reduce((res, { value }, index) => {
            const id = ids[index]
            const last = res.slice(-1)[0] ?? {}
            const obj = {}
            switch (id % 3) {
              case 0:
                obj.bid = id
                obj.bv = df(value, collateralToken.decimal)
                obj.lid = id - 2
                obj.aid - id - 1
                if (last.lid === obj.lid || last.aid === obj.aid) res[res.length - 1] = { ...last, ...obj }
                else res.push(obj)
                return res
              case 1:
                obj.lid = id
                obj.lv = value
                obj.aid = id + 1
                obj.bid = id + 2
                res.push(obj)
                return res
              case 2:
                obj.aid = id
                obj.av = df(value, collateralToken.decimal)
                obj.lid = id - 1
                obj.bid = id + 1
                if (last.lid === id - 1) res[res.length - 1] = { ...last, ...obj }
                else res.push(obj)
                return res
            }
          }, []),
        ),
      )
      .then((result) => runInAction(() => (this.balances = result)))
  }

  findTokens = async (operation) =>
    operation === 'lastTokenId'
      ? invokeScript([
        {
          operation, //['lastTokenId']
          scriptHash: foreHash,
          params: [],
        },
      ]).then(({ stack: [{ value }] }) => new Array((value - 1) / 3).fill(0).map((_, v) => v * 3 + 1))
      : invokeScript([
        {
          operation, //['findUnjudgedTokens', 'findWinningTokens']
          scriptHash: foreHash,
          params: [{ type: 'Integer', value: 0 }],
        },
      ])
        .then(({ stack, session }) => traverseiterator(session, stack[0].id, 100))
        .then((result) => result.map(({ value: [{ value }] }) => b2i(value, 'base64')))

  setMarkets = async (operation = 'lastTokenId') => {
    const ids = typeof operation === 'number' ? [operation] : await this.findTokens(operation)
    const balance = await invokeScript(
      ids
        .reduce((res, cur) => [...res, cur, cur + 1, cur + 2, cur + 1, cur + 2], [])
        .map((value, index) => {
          switch (index % 5) {
            case 0:
            case 1:
            case 2:
              return {
                operation: 'totalSupply',
                scriptHash: foreHash,
                params: [{ type: 'Integer', value }],
              }
            case 3:
            case 4:
              return {
                operation: 'balanceOf',
                scriptHash: foreHash,
                params: [
                  { type: 'Hash160', value: foreHash },
                  { type: 'Integer', value },
                ],
              }
          }
        }),
    ).then(({ stack }) => stack.map(({ value }) => Number(value)))
    return invokeScript(
      ids.map((value) => ({
        scriptHash: foreHash,
        operation: 'properties',
        params: [{ type: 'Integer', value }],
      })),
    )
      .then(({ stack }) =>
        stack.map(({ value }, index) => {
          const collateralToken = collateralTokenMap[value[2].value.value]
          const amountTrue = balance[index * 5 + 1] - balance[index * 5 + 3]
          const amountFalse = balance[index * 5 + 2] - balance[index * 5 + 4]
          const liquidityTokenId = b2i(value[4].value.value)
          const winnerTokenType = Buffer.from(value[7].value.value, 'base64').toString()
          return {
            collateralToken,
            winnerTokenType,
            liquidityTokenId,
            proposition: Buffer.from(value[0].value.value, 'base64').toString(),
            dueTimeStampMilliseconds: new Date(Number(value[3].value.value)),
            dueTime: new Date(Number(value[3].value.value)).toDateString().split(' '),
            winnerTokenId: { Unknown: void 0, True: liquidityTokenId + 1, False: liquidityTokenId + 2 }[
              winnerTokenType
            ],
            liquidity: balance[index * 5],
            volume: df(balance[index * 5 + 1], collateralToken.decimal, 2),
            amountTrue: df(amountTrue, collateralToken.decimal, 2),
            amountFalse: df(amountFalse, collateralToken.decimal, 2),
            liquidityTrueUnformat: balance[index * 5 + 3],
            liquidityFalseUnformat: balance[index * 5 + 4],
            liquidityTrue: df(balance[index * 5 + 3], collateralToken.decimal),
            liquidityFalse: df(balance[index * 5 + 4], collateralToken.decimal),
            ratioTrue: amountTrue / (amountTrue + amountFalse) || 0,
            ratioFalse: amountFalse / (amountTrue + amountFalse) || 0,
          }
        }),
      )
      .then((m) => {
        m.reverse()
        runInAction(() => (typeof operation === 'number' ? (this.market = m[0]) : (this.markets = m)))
        return m
      })
  }

  getStatistics = async () => {
    runInAction(() => (this.statistics = { cash: 0 }))
  }

  update = async (tokenId) => {
    this.setMarkets(tokenId)
    this.getBalance(tokenId)
    walletStore.getBalance()
  }
}

export default new Market()
