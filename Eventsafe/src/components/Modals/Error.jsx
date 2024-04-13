import { Grid, Typography } from '@mui/material'
import { modalStore, observer } from '@/store'
import CModal from '@/components/CModal'

export default observer(({ title = 'Error' }) => {
  const { status, content } = modalStore

  return (
    <CModal open={status.error} setOpen={() => modalStore.close('error')} title={title}>
      <Grid item>
        <Typography children={content.error} sx={{ color: '#6F767E', fontSize: '16px' }} />
        <span
          className="material-icons-outlined"
          style={{ display: 'flex', justifyContent: 'center', color: '#FF6A55', fontSize: '72px', margin: '16px 0' }}
        >
          error
        </span>
      </Grid>
    </CModal>
  )
})
