const TESTNET = 'https://n3seed2.ngd.network:40332' //'https://testmagnet.ngd.network'
const MAINNET = 'https://neofura.ngd.network'
const browser = {
  N3MainNet: 'https://n3.neotube.io',
  N3TestNet: 'https://n3t5.neotube.io',
}
const baseConfig = { fee: 0.006, lpfee: 0 }
const collateralTokenGAS = {
  symbol: 'USDT',
  decimal: 8,
  address: '0xf51D104C16fEC646221789dF97d26B085BE4066B',
  addressHash: 'd2a4cff31913016155e38e474a2c06d08be276cf',
}
const collateralTokenfUSDT = {
  symbol: 'USDT',
  decimal: 6,
  address: '0xf51D104C16fEC646221789dF97d26B085BE4066B',
  addressHash: 'cd48b160c1bbc9d74997b803b9a7ad50a4bef020',
}
const collateralTokenMap = {
  'z3bii9AGLEpHjuNVYQETGfPPpNI=': collateralTokenGAS,
  'zUixYMG7yddJl7gDuaetUKS+8CA=': collateralTokenfUSDT,
}
const symbolMap = {
  GAS: collateralTokenGAS.addressHash,
  fUSDT: collateralTokenfUSDT.addressHash,
}

let NETWORK, foreHash, foreAddress, collateralToken
switch (true) {
  case ['127.0.0.1', 'localhost', 'zk524.github.io'].includes(window.location.hostname):
    foreHash = '0x4569e04baed358ae4e4f8f01ba7f6792cf4c3048'
    foreAddress = 'NSVfhWjiBi7EzsTxC3rEJLEniH67PJhtCN'
    collateralToken = collateralTokenGAS
    NETWORK = TESTNET
    break
  default:
    foreHash = '0x4569e04baed358ae4e4f8f01ba7f6792cf4c3048'
    foreAddress = 'NSVfhWjiBi7EzsTxC3rEJLEniH67PJhtCN'
    // collateralToken = collateralTokenfUSDT
    // NETWORK = MAINNET
    collateralToken = collateralTokenGAS
    NETWORK = TESTNET
    break
}

export {
  TESTNET,
  MAINNET,
  NETWORK,
  browser,
  baseConfig,
  foreHash,
  foreAddress,
  collateralToken,
  collateralTokenMap,
  symbolMap,
}
