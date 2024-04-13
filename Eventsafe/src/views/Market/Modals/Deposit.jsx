import { useRef } from 'react'
import { Grid, Box, Input, Button } from '@mui/material'
import { walletStore, marketStore, modalStore, observer } from '@/store'
import { collateralToken } from '@/store/constant'
import CModal from '@/components/CModal'
import { useContractWrite } from 'wagmi'
import { useAccount } from 'wagmi'
import testabi from '../../../api/testToken.json'
import { df } from '../../../utils/format'

export default observer(() => {
  const { status } = modalStore
  const { market } = marketStore
  const { balance } = walletStore
  const ref = useRef(null)

  const { address } = useAccount()
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0xf51D104C16fEC646221789dF97d26B085BE4066B',
    abi: testabi.output.abi,
    functionName: 'transfer',
  })

  return (
    <CModal open={status.deposit} setOpen={() => modalStore.close('deposit')} title={'Deposit'}>
      <Grid item>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <span style={{ color: '#6F767E' }}>Your Balance</span>
          <span style={{ color: '#6F767E' }}>{`${balance?.[collateralToken.address] ?? 0} ${collateralToken.symbol
            }`}</span>
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
              onClick={() => (ref.current.value = balance?.[collateralToken.addressHash] ?? 0)}
            />
          }
          defaultValue={0}
        />
      </Grid>
      <Grid item>
        <Button
          fullWidth
          sx={{ backgroundColor: '#305FF5', color: '#fff', borderRadius: '8px', mt: 2 }}
          children={'Deposit'}
          onClick={() =>
            write({
              args: [
                '0xf51D104C16fEC646221789dF97d26B085BE4066B',
                10000000000000000000
              ],
              from: address
            })
          }
        />
      </Grid>
    </CModal>
  )
})
