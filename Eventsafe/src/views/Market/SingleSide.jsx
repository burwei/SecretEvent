import { Button, Grid, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default ({ market }) => {
  const navigate = useNavigate()
  return (
    <Grid
      item
      sx={{
        backgroundColor: '#16182C',
        borderRadius: '8px',
        p: 3,
        mb: 2,
        mr: 1,
        '&:hover': { backgroundColor: 'rgba(80,80,80,0.4)', cursor: 'pointer' },
      }}
      onClick={() => {
        sessionStorage.setItem('market_lid', market.liquidityTokenId)
        navigate('/detail')
      }}
    >
      
    </Grid>
  )
}
