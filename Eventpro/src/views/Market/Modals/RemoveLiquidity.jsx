import { useRef } from 'react'
import { Grid, Box, Input, Button, Stack } from '@mui/material'
import { walletStore, marketStore, modalStore, observer } from '@/store'
import CModal from '@/components/CModal'

export default observer(() => {
  const { status } = modalStore
  const { balance, market } = marketStore
  const ref = useRef(null)

  return (
    <CModal
      open={status.removeliquidity}
      setOpen={() => modalStore.close('removeliquidity')}
      title={'Remove Liquidity'}
    >
      <Grid item>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <span style={{ color: '#6F767E' }}>Your Balance</span>
          <span style={{ color: '#6F767E', textAlign: 'right', marginBottom: '4px' }}>{`${
            balance?.liquidity ?? 0
          }`}</span>
        </Box>

        <Stack direction={'row'} spacing={2}>
          <Input
            inputRef={ref}
            fullWidth
            name="amount"
            placeholder="amount"
            disableUnderline
            sx={{
              border: '2px solid #6F767E',
              borderRadius: '8px',
              mb: 2,
              color: '#fff',
              pl: 1,
              height: '50px',
            }}
            endAdornment={
              <Button
                sx={{ color: '#305FF5' }}
                children={'MAX'}
                onClick={() => (ref.current.value = balance.liquidity ?? 0)}
              />
            }
            defaultValue={balance.liquidity ?? 0}
          />
        </Stack>
      </Grid>

      <Grid item>
        <Button
          fullWidth
          sx={{ backgroundColor: '#305FF5', color: '#fff', borderRadius: '8px', mt: 2 }}
          children={'Remove Liquidity'}
          onClick={() =>
            walletStore
              .removeLiquidity(market.liquidityTokenId, ref.current.value)
              .then((txid) => modalStore.open('wait', txid))
              .catch((e) => walletStore.catch(e, 'removeLiquidity'))
              .finally(() => modalStore.close('removeliquidity'))
          }
        />
      </Grid>
    </CModal>
  )
})
