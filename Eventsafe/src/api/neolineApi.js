import { once } from 'lodash-es'
import { walletStore, modalStore, marketStore } from '@/store'
import { foreHash, foreAddress, collateralToken, symbolMap } from '@/store/constant'
import { bnToB64 } from '@/utils/format'

let neoline, neolineN3

const getNetwork = () =>
  neoline
    ?.getNetworks()
    .then(({ defaultNetwork }) => walletStore.setNetwork(defaultNetwork))
    .catch((error) => console.log(error))

const getBalance = async () =>
  neolineN3?.getBalance().then((result) => {
    const balance =
      result[walletStore.address]?.reduce(
        (res, { symbol, amount }) => ({ ...res, [symbolMap[symbol.toUpperCase()]]: amount }),
        {},
      ) ?? {}
    walletStore.set({ balance })
    return balance
  })

const getAccount = async () => {
  if (!window.NEOLine || !window.NEOLineN3) modalStore.open('warn', 'You could not connect to the wallet!')
  return neoline
    ?.getAccount()
    .then(({ address }) => {
      getNetwork()
      sessionStorage.setItem('connect', 'true')
      sessionStorage.setItem('preConnectWallet', 'Neoline')
      walletStore.set({ walletName: 'Neoline' })
      walletStore.setAddress(address)
      getBalance()
    })
    .catch((error) => console.log(error))
}

const invoke = async (operation, args, scriptHash) => {
  const { addressHash } = walletStore
  return neolineN3
    ?.invoke({
      operation,
      args,
      fee: '0',
      scriptHash: scriptHash ?? foreHash,
      broadcastOverride: false,
      signers: [{ account: addressHash, scopes: 1 }],
    })
    .then(({ txid }) => txid)
}

const deposit = async (tokenId, amount) => {
  const { address } = walletStore
  return invoke(
    'transfer',
    [
      { type: 'Address', value: address },
      { type: 'Address', value: foreAddress },
      { type: 'Integer', value: amount },
      {
        type: 'Array',
        value: [
          { type: 'String', value: 'deposit' },
          { type: 'ByteArray', value: bnToB64(tokenId) },
        ],
      },
    ],
    collateralToken.addressHash,
  )
}

const addLiquidity = async (tokenId, amax, amin, bmax, bmin) => {
  const { address, addressHash } = walletStore
  return neolineN3
    ?.invokeMultiple({
      invokeArgs: [
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: amax },
            { type: 'ByteArray', value: bnToB64(tokenId + 1) },
            {
              type: 'Array',
              value: [
                { type: 'String', value: 'addLiquidity' },
                { type: 'Integer', value: 0 },
                { type: 'Integer', value: 0 },
                { type: 'Integer', value: new Date().getTime() + 60000 },
              ],
            },
          ],
        },
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: bmax },
            { type: 'ByteArray', value: bnToB64(tokenId + 2) },
            {
              type: 'Array',
              value: [
                { type: 'String', value: 'addLiquidity' },
                { type: 'Integer', value: bmin },
                { type: 'Integer', value: amin },
                { type: 'Integer', value: new Date().getTime() + 60000 },
              ],
            },
          ],
        },
      ],
      fee: '0',
      broadcastOverride: false,
      signers: [{ account: addressHash, scopes: 1 }],
    })
    .then(({ txid }) => txid)
    .catch(console.log)
}

const removeLiquidity = async (tokenId, amount, tmin, fmin) => {
  const { address } = walletStore
  return invoke(
    'transfer',
    [
      { type: 'Address', value: address },
      { type: 'Address', value: foreAddress },
      { type: 'Integer', value: amount },
      { type: 'ByteArray', value: bnToB64(tokenId) },
      {
        type: 'Array',
        value: [
          { type: 'String', value: 'removeLiquidity' },
          { type: 'Integer', value: tmin },
          { type: 'Integer', value: fmin },
          { type: 'Integer', value: new Date().getTime() + 60000 },
        ],
      },
    ],
    foreHash,
  )
}

const buy = async (tokenId, amount) => {
  const { address } = walletStore
  return invoke(
    'transfer',
    [
      { type: 'Address', value: address },
      { type: 'Address', value: foreAddress },
      { type: 'Integer', value: amount },
      { type: 'ByteArray', value: bnToB64(tokenId) },
      {
        type: 'Array',
        value: [
          { type: 'String', value: 'buy' },
          { type: 'Integer', value: 0 },
          { type: 'Integer', value: new Date().getTime() + 60000 },
        ],
      },
    ],
    foreHash,
  )
}

const buyOnce = async (tokenId, amount) => {
  const { address, addressHash } = walletStore
  return neolineN3
    ?.invokeMultiple({
      invokeArgs: [
        {
          scriptHash: collateralToken.addressHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: amount },
            {
              type: 'Array',
              value: [
                { type: 'String', value: 'deposit' },
                { type: 'ByteArray', value: bnToB64(tokenId % 3 === 0 ? tokenId - 2 : tokenId - 1) },
              ],
            },
          ],
        },
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: amount },
            { type: 'ByteArray', value: bnToB64(tokenId) },
            {
              type: 'Array',
              value: [
                { type: 'String', value: 'buy' },
                { type: 'Integer', value: 0 },
                { type: 'Integer', value: new Date().getTime() + 60000 },
              ],
            },
          ],
        },
      ],
      fee: '0',
      broadcastOverride: false,
      signers: [{ account: addressHash, scopes: 1 }],
    })
    .then(({ txid }) => txid)
}

const redeem = async (tokenId, amount) => {
  const { address, addressHash } = walletStore
  return neolineN3
    ?.invokeMultiple({
      invokeArgs: [
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: amount },
            { type: 'ByteArray', value: bnToB64(tokenId + 1) },
            {
              type: 'Array',
              value: [{ type: 'String', value: 'redeem' }],
            },
          ],
        },
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: amount },
            { type: 'ByteArray', value: bnToB64(tokenId + 2) },
            {
              type: 'Array',
              value: [{ type: 'String', value: 'redeem' }],
            },
          ],
        },
      ],
      fee: '0',
      broadcastOverride: false,
      signers: [{ account: addressHash, scopes: 1 }],
    })
    .then(({ txid }) => txid)
}

const redeemOnce = async (tokenId, amount, balance) => {
  const { address, addressHash } = walletStore
  return neolineN3
    ?.invokeMultiple({
      invokeArgs: [
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: amount },
            { type: 'ByteArray', value: bnToB64(tokenId) },
            {
              type: 'Array',
              value: [
                { type: 'String', value: 'buy' },
                { type: 'Integer', value: 0 },
                { type: 'Integer', value: new Date().getTime() + 60000 },
              ],
            },
          ],
        },
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: balance },
            { type: 'ByteArray', value: bnToB64(tokenId % 3 === 0 ? tokenId - 1 : tokenId) },
            {
              type: 'Array',
              value: [{ type: 'String', value: 'redeem' }],
            },
          ],
        },
        {
          scriptHash: foreHash,
          operation: 'transfer',
          args: [
            { type: 'Address', value: address },
            { type: 'Address', value: foreAddress },
            { type: 'Integer', value: balance },
            { type: 'ByteArray', value: bnToB64(tokenId % 3 === 0 ? tokenId : tokenId + 1) },
            {
              type: 'Array',
              value: [{ type: 'String', value: 'redeem' }],
            },
          ],
        },
      ],
      fee: '0',
      broadcastOverride: false,
      signers: [{ account: addressHash, scopes: 1 }],
    })
    .then(({ txid }) => txid)
}

const winnerRedeem = async (tokenId, amount) => {
  const { address } = walletStore
  return invoke(
    'transfer',
    [
      { type: 'Address', value: address },
      { type: 'Address', value: foreAddress },
      { type: 'Integer', value: amount },
      { type: 'ByteArray', value: bnToB64(tokenId) },
      {
        type: 'Array',
        value: [{ type: 'String', value: 'winnerRedeem' }],
      },
    ],
    foreHash,
  )
}

const disconnect = () => {
  sessionStorage.removeItem('connect')
  sessionStorage.removeItem('preConnectWallet')
  walletStore.setAddress('Connect Wallet')
}

const initDapi = () => {
  const onReady = once(async () => {
    if (!neoline || !neolineN3) [neoline, neolineN3] = [new window.NEOLine.Init(), new window.NEOLineN3.Init()]
    neoline?.addEventListener(neoline.EVENT.DISCONNECTED, disconnect)
    neoline?.addEventListener(neoline.EVENT.ACCOUNT_CHANGED, ({ address }) => walletStore.setAddress(address))
    neoline?.addEventListener(neoline.EVENT.NETWORK_CHANGED, ({ defaultNetwork }) =>
      walletStore.setNetwork(defaultNetwork),
    )
    neoline.addEventListener(neoline.EVENT.TRANSACTION_CONFIRMED, ({ txid }) => {
      modalStore.close('wait')
      modalStore.open('success', txid)
      marketStore.update(marketStore.market?.liquidityTokenId)
    })
    sessionStorage.getItem('connect') === 'true' &&
      sessionStorage.getItem('preConnectWallet') === 'Neoline' &&
      getAccount()
  })
  if (window.NEOLine && window.NEOLineN3) {
    onReady()
    return
  }
  window.addEventListener('NEOLine.NEO.EVENT.READY', () => window.NEOLine && window.NEOLineN3 && onReady())
  window.addEventListener('NEOLine.N3.EVENT.READY', () => window.NEOLine && window.NEOLineN3 && onReady())
}

export {
  initDapi,
  getNetwork,
  getAccount,
  disconnect,
  invoke,
  getBalance,
  deposit,
  addLiquidity,
  removeLiquidity,
  redeem,
  redeemOnce,
  winnerRedeem,
  buy,
  buyOnce,
  neoline,
  neolineN3,
}
