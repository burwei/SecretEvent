import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { useRoutes, HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonMumbai } from 'viem/chains'
import Layout from '@/views/Layout'
import theme from '@/styles'
import './index.css'
import logo from '@/assets/img/logo.svg'
require('lazymacro')

const projectId = '72deb4e2ac6864809edba7d9666ccac9'

// 2. Create wagmiConfig
const metadata = {
  name: 'prophet',
  description: 'A prediction market dapp',
  icons: [logo]
}

const chains = [polygonMumbai, mainnet, arbitrum, polygon];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

const [Home, Market, Detail, Portfolio] = ['Home', 'Market', 'Market/Detail', 'Portfolio'].map((v) => () => {
  const Lazy = lazy(() => import(`@/views/${v}`))
  return <Suspense fallback={<></>} children={<Lazy />} />
})

const Routes = () =>
  useRoutes([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'market', element: <Market /> },
        { path: 'portfolio', element: <Portfolio /> },
        { path: 'detail', element: <Detail /> },
      
      ],
    },
  ])

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <WagmiConfig config={wagmiConfig}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </WagmiConfig>
  </ThemeProvider>,
)
