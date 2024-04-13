import { Grid, Typography } from '@mui/material'
import { modalStore, walletStore, observer } from '@/store'
import { browser } from '@/store/constant'
import CModal from '@/components/CModal'

export default observer(({ title = 'Success' }) => {
  const { status, content } = modalStore
  const { network } = walletStore

  return (
    <CModal open={status.success} setOpen={() => modalStore.close('success')} title={title}>
      <Grid item>
        {content.success.length == 66 ? (
          <a href={`${browser[network]}/transaction/${content.success}`} target="_blank" style={{ color: '#6F767E' }}>
            View in explorer
          </a>
        ) : (
          <Typography children={content.success} sx={{ color: '#6F767E', fontSize: '16px', wordBreak: 'break-all' }} />
        )}
        <span
          className="material-icons-outlined"
          style={{ display: 'flex', justifyContent: 'center', color: '#83BF6E', fontSize: '72px', margin: '16px 0' }}
        >
          check_circle
        </span>
      </Grid>
    </CModal>
  )
})
