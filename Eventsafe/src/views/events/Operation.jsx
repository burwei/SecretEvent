import { useRef, useState } from 'react'
import { Button, Grid, Box, Input, Stack } from '@mui/material'
import { walletStore, marketStore, modalStore, observer } from '@/store'
import { baseConfig, collateralToken } from '@/store/constant'
import RemoveLiquidity from './Modals/RemoveLiquidity'
import AddLiquidity from './Modals/AddLiquidity'
import Deposit from './Modals/Deposit'
import Redeem from './Modals/Redeem'
import Sellyes from './Modals/Sellyes'
import SellNo from './Modals/SellNo'

export default observer(({ expired }) => {
  const { balance, market } = marketStore
  const [adv, setAdv] = useState(false)
  const ref = useRef(null)

  return (
    <Grid item>
      <Box sx={{ backgroundColor: '#16182C', borderRadius: '8px', mb: 1, p: 3 }}>
        <Stack mb={2} spacing={1} direction={'row'}>
         
          
          
        </Stack>

       
        

        {walletStore.address !== 'Connect Wallet' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <span style={{ color: '#6F767E' }}>Your Balance</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#6F767E', textAlign: 'right', marginBottom: '4px' }}>{`${collateralToken.symbol
                }: ${walletStore.balance?.[collateralToken.addressHash] ?? 0}`}</span>
              <span style={{ color: '#6F767E', textAlign: 'right', marginBottom: '4px' }}>{`Yes: ${balance?.amountTrue ?? 0
                }`}</span>
              <span style={{ color: '#6F767E', textAlign: 'right', marginBottom: '4px' }}>{`No: ${balance?.amountFalse ?? 0
                }`}</span>
            </div>
          </Box>
        )}

        <Input
          inputRef={ref}
          fullWidth
          disableUnderline
          defaultValue={0}
          type={'number'}
          sx={{ border: '2px solid #6F767E', borderRadius: '8px', color: '#fff', pl: 1, height: '50px' }}
          endAdornment={
            <Button
              sx={{ color: '#305FF5' }}
              children={'MAX'}
              onClick={() => (ref.current.value = walletStore.balance?.[collateralToken.addressHash] ?? 0)}
            />
          }
        />

        <Stack my={2} spacing={1} direction={'row'}>
          <Button
            disabled={expired}
            sx={{
              width: '100%',
              bgcolor: '#83BF6E',
              '&:hover': { bgcolor: '#b9dbad' },
              color: '#fff',
              borderRadius: '8px',
            }}
            children={'redeem'}
            onClick={() =>
              walletStore
                .buyOnce(market?.liquidityTokenId + 2, ref.current.value)
                .then((txid) => modalStore.open('wait', txid))
                .catch((e) => walletStore.catch(e, 'redeemonce'))
            }
          />
          
          {market?.winnerTokenType === 'Unknown' ? (
            <Button
              disabled={expired}
              sx={{
                width: '100%',
                bgcolor: '#305FF5',
                '&:hover': { bgcolor: '#5077f6' },
                color: '#fff',
                borderRadius: '8px',
              }}
              children={'redeem'}
              onClick={() => modalStore.open('redeem')}
            />
          ) : (
            <Button
              sx={{
                width: '100%',
                backgroundColor: '#305FF5',
                '&:hover': { bgcolor: '#5077f6' },
                color: '#fff',
                borderRadius: '8px',
              }}
              children={'winnerRedeem'}
              onClick={() =>
                walletStore
                  .winnerRedeem()
                  .then((txid) => modalStore.open('wait', txid))
                  .catch((e) => walletStore.catch(e, 'winnerRedeem'))
              }
            />
          )}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            mb: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            '&:hover': { cursor: 'pointer' },
          }}
          onClick={() => setAdv(!adv)}
        >
         
          <span className="material-icons" style={{ color: '#6F767E', fontSize: '24px' }}>
            {`${adv ? 'show_less' : 'show_more'}`}
          </span>
        </Box>
        {adv && (
          <>
          
          </>
        )}
      </Box>

      <Stack spacing={1} direction={'row'}>
        
        
        
      </Stack>

      <AddLiquidity />
      <RemoveLiquidity />
      <Deposit />
      <Redeem />
      <Sellyes />
      <SellNo />
    </Grid>
  )
})
