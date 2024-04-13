import { useRef } from 'react'
import { Grid, Box, Input, Button, Stack } from '@mui/material'
import { walletStore, marketStore, modalStore, observer } from '@/store'
import CModal from '@/components/CModal'

export default observer(() => {
  const { status } = modalStore
  const { market, balance } = marketStore
  const ref = useRef(null)

  return (
    <CModal open={status.redeem} setOpen={() => modalStore.close('redeem')} title={'Redeem'}>
      <Grid item>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <span style={{ color: '#6F767E' }}>Your Balance</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#6F767E' }}>{`Yes: $${balance?.amountTrue?.toLocaleString() ?? 0}`}</span>
            <span style={{ color: '#6F767E', textAlign: 'right' }}>{`No: $${
              balance?.amountFalse?.toLocaleString() ?? 0
            }`}</span>
          </div>
        </Box>
        <Input
          inputRef={ref}
          fullWidth
          disableUnderline
          type="number"
          sx={{ border: '2px solid #6F767E', borderRadius: '8px', mb: 2, color: '#fff', pl: 1, height: '50px' }}
          endAdornment={
            <Button
              sx={{ color: '#305FF5' }}
              children={'MAX'}
              onClick={() => (ref.current.value = Math.min(balance.amountTrue ?? 0, balance.amountFalse ?? 0))}
            />
          }
          defaultValue={Math.min(balance.amountTrue ?? 0, balance.amountFalse ?? 0)}
        />
      </Grid>
      <Stack direction={'row'} spacing={1}>
        <Button
          sx={{
            backgroundColor: '#305FF5',
            '&:hover': { bgcolor: '#5077f6' },
            color: '#fff',
            borderRadius: '8px',
            flexGrow: 3,
          }}
          children={'Redeem'}
          onClick={() =>
            walletStore
              .redeem(market?.liquidityTokenId, ref.current.value)
              .then((txid) => modalStore.open('wait', txid))
              .catch((e) => walletStore.catch(e, 'redeem'))
              .finally(() => modalStore.close('redeem'))
          }
        />
        <Button
          sx={{
            backgroundColor: '#FF6A55',
            '&:hover': { bgcolor: '#f1a196' },
            color: '#fff',
            borderRadius: '8px',
            flexGrow: 1,
          }}
          children={'Redeem All'}
          onClick={() =>
            walletStore
              .redeemOnce()
              .then((txid) => modalStore.open('wait', txid))
              .catch((e) => walletStore.catch(e, 'redeemOnce'))
              .finally(() => modalStore.close('redeem'))
          }
        />
      </Stack>
    </CModal>
  )
})
