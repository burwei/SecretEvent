import { Grid, Typography } from '@mui/material'
import { modalStore, observer } from '@/store'
import CModal from '@/components/CModal'

export default observer(({ title = 'Warning' }) => {
  const { status, content } = modalStore

  return (
    <CModal open={status.warn} setOpen={() => modalStore.close('warn')} title={title}>
      <Grid item>
        <Typography children={content.warn} sx={{ color: '#6F767E', fontSize: '16px', wordBreak: 'break-all' }} />
        <span
          className="material-icons-outlined"
          style={{ display: 'flex', justifyContent: 'center', color: '#FFD88D', fontSize: '72px', margin: '16px 0' }}
        >
          warning
        </span>
      </Grid>
    </CModal>
  )
})
