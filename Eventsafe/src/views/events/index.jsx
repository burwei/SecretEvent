import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { walletStore, marketStore, observer } from '@/store'
import Statistics from './Statistics'
import Dashboard from './Dashbord'


export default observer(() => {
  const navigate = useNavigate()
  const { address } = walletStore

  useEffect(() => {
    sessionStorage.getItem('connect') !== 'true' && navigate('/market')
    sessionStorage.setItem('routes', '/portfolio')
    marketStore.getStatistics()
  }, [address])

  return (
    <Grid container sx={{ maxWidth: '1200px', height: 'fit-content' }}>
      <Typography children={'My Portfolio'} sx={{ color: 'white', fontSize: '24px', my: 2 }} />
      <Statistics />
      <Dashboard />
    </Grid>
  )
})
