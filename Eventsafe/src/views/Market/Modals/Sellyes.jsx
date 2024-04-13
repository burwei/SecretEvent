import { useRef, useState } from 'react'
import { Grid, Box, Input, Button } from '@mui/material'
import { walletStore, marketStore, modalStore, observer } from '@/store'
import { y2n } from '@/utils/calc'
import CModal from '@/components/CModal'

const SellInput = ({ inputRef }) => {
  const { balance } = marketStore
  const [amountFalse, setAmountFalse] = useState(0)

  return (
    <Grid item>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <span style={{ color: '#6F767E' }}>Your Balance</span>
        <span style={{ color: '#6F767E', textAlign: 'right' }}>{`Yes: $${balance?.amountTrue ?? 0}`}</span>
      </Box>
      <Input
        inputRef={inputRef}
        fullWidth
        disableUnderline
        type="number"
        sx={{ border: '2px solid #6F767E', borderRadius: '8px', mb: 1, color: '#fff', pl: 1, height: '50px' }}
        endAdornment={
          <Button
            sx={{ color: '#305FF5' }}
            children={'MAX'}
            onClick={() => setAmountFalse(y2n((inputRef.current.value = balance?.amountTrue ?? 0)))}
          />
        }
        onChange={(e) => setAmountFalse(y2n(e.target.value))}
        defaultValue={0}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 0.5 }}>
        <span
          style={{ color: '#6F767E', fontSize: '12px' }}
        >{`You will get about ${amountFalse.toLocaleString()} NO,`}</span>
        <span style={{ color: '#6F767E', fontSize: '12px' }}>{`Your Balance No will be about ${(
          (balance?.amountFalse ?? 0) + amountFalse
        ).toLocaleString()}.`}</span>
      </Box>
    </Grid>
  )
}

export default observer(() => {
  const { status } = modalStore
  const { market } = marketStore
  const ref = useRef(null)

  return (
    <CModal open={status.sellyes} setOpen={() => modalStore.close('sellyes')} title={'Sell Yes'}>
      <SellInput inputRef={ref} />
      <Grid item>
        <Button
          fullWidth
          sx={{ backgroundColor: '#305FF5', color: '#fff', borderRadius: '8px', mt: 2 }}
          children={'Sell Yes'}
          onClick={() =>
            walletStore
              .buy(market?.liquidityTokenId + 1, ref.current.value)
              .then((txid) => modalStore.open('wait', txid))
              .catch((e) => walletStore.catch(e, 'buy'))
              .finally(() => modalStore.close('sellyes'))
          }
        />
      </Grid>
    </CModal>
  )
})
