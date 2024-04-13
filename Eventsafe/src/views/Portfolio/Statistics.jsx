import { Grid, Typography, Divider, Box } from '@mui/material'
import { marketStore, observer } from '@/store'
import InfoSymbol from '@/components/InfoSymbol'

export default observer(() => {
  const { statistics } = marketStore

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        backgroundColor: '#16182C',
        p: 3,
        borderRadius: '8px',
        justifyContent: 'space-between',
      }}
    >
      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography children={'Portfolio Value'} sx={{ color: '#6F767E', my: 1, mr: 1 }} />
          <InfoSymbol content={'Portfolio Value'} />
        </Box>
        <Typography children={`$${statistics.portfolio_value ?? 0}`} sx={{ color: 'white', my: 1, fontSize: '28px' }} />
      </Grid>

      <Divider orientation="vertical" flexItem xs={1} sx={{ mx: 2, borderColor: '#6F767E' }} />

      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography children={'Open Position'} sx={{ color: '#6F767E', my: 1, mr: 1 }} />
          <InfoSymbol content={'Open Position'} />
        </Box>
        <Typography children={`$${statistics.open_position ?? 0}`} sx={{ color: 'white', my: 1, fontSize: '28px' }} />
      </Grid>

      <Divider orientation="vertical" flexItem xs={1} sx={{ mx: 2, borderColor: '#6F767E' }} />

      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box display={'flex'} alignItems={'center'}>
          <Typography children={'Cash'} sx={{ color: '#6F767E', my: 1, mr: 1 }} />
          <InfoSymbol content={'Cash'} />
        </Box>
        <Typography children={`$${statistics.cash ?? 0}`} sx={{ color: 'white', my: 1, fontSize: '28px' }} />
      </Grid>
    </Grid>
  )
})
