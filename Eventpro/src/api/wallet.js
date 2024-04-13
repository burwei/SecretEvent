let walletApi = {
  Neoline: null,
  O3: null,
  OneGate: null,
  Neon: null,
}

const initWalletApi = async () => {
  import('./neolineApi').then((res) => {
    walletApi.Neoline = res
    res.initDapi()
  })
  // import('./neonApi').then((res) => {
  //   walletApi.Neon = res
  //   res.initDapi()
  // })
}

export { initWalletApi, walletApi }
