import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid, Button, Divider, useMediaQuery, useTheme } from '@mui/material'
import { walletStore, observer } from '@/store'
import logoTitle from '@/assets/img/logoTitle.png'
import logo from '@/assets/img/logo.png'
import ConnectWallet from './ConnectWallet'

export default observer(() => {
  const { address } = walletStore
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menu, setMenu] = useState('')
  const theme = useTheme()
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setMenu(pathname.split('/').pop()?.toLowerCase())
  }, [pathname])

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Grid item container sx={{ width: 'auto' }}>
        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() => navigate('/')}
        >
          <img src={matchesXs ? logo : logoTitle} style={{ height: '80px', marginRight: '16px' }} />
        </Grid>
        {!matchesXs && <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: '#16182C' }} />}
        <Grid item container sx={{ width: 'auto', alignItems: 'center' }}>
          <Grid item>
            <Button onClick={() => {
              sessionStorage.setItem('routes', '/home')
              navigate('/home')
            }}
              sx={{
                color: 'white',
                py: 0,
                px: matchesXs ? 1 : 2,
                mx: 1,
                boxSizing: 'border-box',
                borderBottom: ['', 'home'].includes(menu) ? '4px solid #5f9ff8' : 'none',
              }}
            >
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                sessionStorage.setItem('routes', '/market')
                navigate('/market')
              }}
              sx={{
                color: 'white',
                py: 0,
                px: matchesXs ? 1 : 2,
                mx: 1,
                boxSizing: 'border-box',
                borderBottom: ['market', 'detail'].includes(menu) ? '4px solid #5f9ff8' : 'none',
              }}
            >
              Tickets
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                sessionStorage.setItem('routes', '/events')
                navigate('/events')
              }}
              sx={{
                color: 'white',
                py: 0,
                px: matchesXs ? 1 : 2,
                mx: 1,
                boxSizing: 'border-box',
                borderBottom: ['events'].includes(menu) ? '4px solid #5f9ff8' : 'none',
              }}
            >
              My Events
            </Button>
          </Grid>
          {address !== 'Connect Wallet' && (
            <Grid item>
              
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={() => window.open('https://www.notion.so/EthDam-101daa5d23be4eed89a12bc2b735b43f')}
              sx={{
                color: 'white',
                py: 0,
                px: matchesXs ? 1 : 2,
                mx: 1,
                boxSizing: 'border-box',
              }}
            >
              Doc
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <ConnectWallet />
      </Grid>
    </Grid>
  )
})
