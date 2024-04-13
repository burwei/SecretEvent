import { Outlet } from 'react-router-dom'
import { AppBar, Box, Toolbar } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Success from '@/components/Modals/Success'
import Error from '@/components/Modals/Error'
import Wait from '@/components/Modals/Wait'
import Warn from '@/components/Modals/Warn'

const Main = styled('main')(() => {
  const theme = useTheme()
  return theme.typography.mainContent
})

export default () => (
  <Box sx={{ display: 'flex' }}>
    <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: '#070707' }}>
      <Toolbar>
        <Header />
      </Toolbar>
    </AppBar>
    <Main>
      <Outlet />
      <Footer />
    </Main>

    <Success />
    <Error />
    <Wait />
    <Warn />
  </Box>
)
