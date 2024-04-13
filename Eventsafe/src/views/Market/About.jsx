import { Button, Grid, Typography } from '@mui/material'

export default () => {
  return (
    <Grid item xs={12}>
      <Typography
        children={'About this market'}
        sx={{
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          my: 2,
        }}
      />
      <Typography
        sx={{ whiteSpace: 'break-spaces', color: '#fff', fontSize: '16px', my: 2 }}
        children={`Introduce...`}
      />
      <Button
        sx={{ backgroundColor: '#16182C', borderRadius: '8px', px: 2 }}
        children={
          <>
            <span style={{ color: '#6F767E', marginRight: '8px' }}>Data Resolver</span>
            <span style={{ color: '#305FF5', textTransform: 'lowercase' }}>www.neooracle.com</span>
          </>
        }
      />
    </Grid>
  )
}
