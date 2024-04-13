import { Grid, Typography, CircularProgress } from '@mui/material'
import { modalStore, walletStore, observer } from '@/store'
import { browser } from '@/store/constant'
import CModal from '@/components/CModal'

export default observer(({ title = 'Wait for Confirmation' }) => {
  const { status, content } = modalStore
  const { network } = walletStore
  console.log()
  return (
    <CModal open={status.wait} setOpen={() => modalStore.close('wait')} title={title}>
      <Grid item>
        {content.wait.length == 66 ? (
          <a href={`${browser[network]}/transaction/${content.wait}`} target="_blank" style={{ color: '#6F767E' }}>
            View in explorer
          </a>
        ) : (
          <Typography children={content.wait} sx={{ color: '#6F767E', fontSize: '16px', wordBreak: 'break-all' }} />
        )}
        <Grid sx={{ textAlign: 'center', my: 3 }}>
          <CircularProgress color="primary" size={80} sx={{ textAlign: 'center' }} />
        </Grid>
      </Grid>
    </CModal>
  )
})
