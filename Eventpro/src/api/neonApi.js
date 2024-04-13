import WcSdk from '@cityofzion/wallet-connect-sdk-core'
import SignClient from '@walletconnect/sign-client'
import { walletStore, modalStore, marketStore } from '@/store'
import { foreHash, foreAddress, collateralToken, symbolMap } from '@/store/constant'

let wcInstance = {}
let initSuccess = false
const testnetKey = 'neo3:testnet'
const mainnetKey = 'neo3:mainnet'
const NEONWALLET_CONNECTED_KEY = 'NEONWALLET_CONNECTED'

const getAccount = async () => {
  await wcInstance.loadSession()
  getNetwork()
  if (!wcInstance.session && initSuccess) {
    await wcInstance.connect(mainnetKey)
    getNetwork()
  }
  sessionStorage.setItem(NEONWALLET_CONNECTED_KEY, 'true')
  sessionStorage.setItem('connect', 'true')
  sessionStorage.setItem('preConnectWallet', 'Neon')
  walletStore.set({ walletName: 'Neon' })
  walletStore.setAddress(
    wcInstance.session && wcInstance.getAccountAddress() ? wcInstance.getAccountAddress() : 'Connect Wallet',
  )
}

const getBalance = async () => {}

const getNetwork = async () => {
  if (wcInstance.session) {
    const network = await wcInstance.getChainId()
    if (network && network.indexOf('mainnet') > 0) {
      walletStore.setNetwork('N3MainNet')
      return 'N3MainNet'
    } else if (network && network.indexOf('testnet') > 0) {
      walletStore.setNetwork('N3TestNet')
      return 'N3TestNet'
    }
  }
  return ''
}

async function transfer() {
  return wcInstance
    ?.invokeFunction({
      invocations: [
        {
          scriptHash: '',
          operation: 'transfer',
          args: [{ type: 'Address', value: '' }],
        },
      ],
      signers: [{ scopes: 1 }],
    })
    .then((result) => result)
}

const disconnect = async () => {
  sessionStorage.removeItem(NEONWALLET_CONNECTED_KEY)
  sessionStorage.removeItem('connect')
  sessionStorage.removeItem('preConnectWallet')
  walletStore.setAddress('Connect Wallet')
  try {
    await wcInstance.disconnect()
  } catch (e) {
    console.log(e)
  }
  location.reload()
}

const initDapi = async () => {
  const client = await SignClient.init({
    projectId: 'd8f33ca7b71a430ccdaa9fc03ea10277',
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
      name: 'NeoBurger',
      description: 'NeoBurger',
      url: location.href,
      icons: [`https://${location.host}/logo.png`],
    },
  })
  wcInstance = new WcSdk(client)
  await wcInstance.manageSession()
  initSuccess = true
  if (sessionStorage.getItem('preConnectWallet') === 'Neon') await getAccount()
}

export { initDapi, getAccount, getBalance, transfer, disconnect, getNetwork }
