import { useRef, useState } from 'react'
import { Grid, Input, Button, Box, Stack, Switch, FormGroup, FormControlLabel } from '@mui/material'
import { walletStore, marketStore, modalStore, observer } from '@/store'
import { collateralToken } from '@/store/constant'
import { df } from '@/utils/format'
import CModal from '@/components/CModal'

const AddInput = ({ inputRef }) => {
  const { market, balance } = marketStore
  const [yes, setYes] = useState(0)
  const [no, setNo] = useState(0)
  const handle = (amax) => {
    if (amax <= 0) {
      setYes(0)
      setNo(0)
      return
    }
    if (market.liquidity === 0) {
      const min = Math.min(amax, balance?.amountTrue ?? 0, balance?.amountFalse ?? 0)
      setYes(min)
      setNo(min)
      return
    }
    const bmax = df(
      (df(amax, -collateralToken.decimal) * market.liquidityFalseUnformat) / market.liquidityTrueUnformat,
      collateralToken.decimal,
    )
    if (bmax < balance?.amountFalse) {
      setYes(amax)
      setNo(bmax)
    } else {
      setYes(
        (inputRef.current.value = df(
          (df(balance?.amountFalse, -collateralToken.decimal) * market.liquidityTrueUnformat) /
            market.liquidityFalseUnformat,
          collateralToken.decimal,
          collateralToken.decimal,
        )),
      )
      setNo(balance?.amountFalse)
    }
  }

  return (
    <Grid item flexDirection={'column'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <span style={{ color: '#6F767E' }}>Your Balance</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#6F767E', textAlign: 'right' }}>{`Yes: ${balance?.amountTrue ?? 0}`}</span>
          <span style={{ color: '#6F767E', textAlign: 'right' }}>{`No: ${balance?.amountFalse ?? 0}`}</span>
        </div>
      </Box>
      <Input
        inputRef={inputRef}
        placeholder="AMax"
        disableUnderline
        fullWidth
        type={'number'}
        sx={{
          border: '2px solid #6F767E',
          borderRadius: '8px',
          mb: 1,
          color: '#fff',
          pl: 1,
          height: '50px',
        }}
        endAdornment={
          <Button
            sx={{ color: '#305FF5' }}
            children={'MAX'}
            onClick={() =>
              handle(
                (inputRef.current.value =
                  market.liquidity === 0
                    ? Math.min(balance?.amountTrue ?? 0, balance?.amountFalse ?? 0)
                    : balance?.amountTrue ?? 0),
              )
            }
          />
        }
        onChange={(e) => handle(e.target.value)}
        defaultValue={0}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 0.5 }}>
        <span
          style={{ color: '#6F767E', fontSize: '12px' }}
        >{`You will put about ${yes.toLocaleString()} Yes and ${no.toLocaleString()} No to the liquidity.`}</span>
      </Box>
    </Grid>
  )
}

const AddInputAdvanced = ({ inputRef }) => {
  const { balance } = marketStore
  const [ref_amax, ref_bmax, ref_amin, ref_bmin] = inputRef

  return (
    <Grid item>
      <Stack direction={'row'} spacing={2}>
        <span style={{ color: '#6F767E', width: '50%' }}>Yes max</span>
        <span style={{ color: '#6F767E', width: '50%' }}>Yes min</span>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Input
          inputRef={ref_amax}
          placeholder="AMax"
          disableUnderline
          sx={{
            border: '2px solid #6F767E',
            borderRadius: '8px',
            mb: 2,
            color: '#fff',
            pl: 1,
            height: '50px',
            width: '50%',
          }}
          endAdornment={
            <Button
              sx={{ color: '#305FF5' }}
              children={'MAX'}
              onClick={() => (ref_amax.current.value = balance.amountTrue ?? 0)}
            />
          }
          defaultValue={0}
        />
        <Input
          inputRef={ref_amin}
          placeholder="AMin"
          disableUnderline
          sx={{
            border: '2px solid #6F767E',
            borderRadius: '8px',
            mb: 2,
            color: '#fff',
            pl: 1,
            height: '50px',
            width: '50%',
          }}
          defaultValue={0}
        />
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <span style={{ color: '#6F767E', width: '50%' }}>No max</span>
        <span style={{ color: '#6F767E', width: '50%' }}>No min</span>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Input
          inputRef={ref_bmax}
          placeholder="BMax"
          disableUnderline
          sx={{
            border: '2px solid #6F767E',
            borderRadius: '8px',
            mb: 2,
            color: '#fff',
            pl: 1,
            height: '50px',
            width: '50%',
          }}
          endAdornment={
            <Button
              sx={{ color: '#305FF5' }}
              children={'MAX'}
              onClick={() => (ref_bmax.current.value = balance.amountFalse ?? 0)}
            />
          }
          defaultValue={0}
        />
        <Input
          inputRef={ref_bmin}
          placeholder="BMin"
          disableUnderline
          sx={{
            border: '2px solid #6F767E',
            borderRadius: '8px',
            mb: 2,
            color: '#fff',
            pl: 1,
            height: '50px',
            width: '50%',
          }}
          defaultValue={0}
        />
      </Stack>
    </Grid>
  )
}

const AddLiquidity = ({ inputRef }) => {
  const [adv, setAdv] = useState(false)

  return (
    <>
      <FormGroup mb={2}>
        <FormControlLabel
          control={<Switch checked={adv} onChange={(e) => setAdv(e.target.checked)} color="primary" />}
          label={<span style={{ color: '#fff' }}>{`Mode: ${adv ? 'Advanced' : 'Normal'}`}</span>}
          labelPlacement="start"
        />
      </FormGroup>
      <Box my={0.5} />
      {adv ? <AddInputAdvanced inputRef={inputRef} /> : <AddInput inputRef={inputRef[0]} />}
    </>
  )
}

export default observer(() => {
  const { status } = modalStore
  const { market } = marketStore
  const inputRef = [useRef(null), useRef(null), useRef(null), useRef(null)]

  return (
    <CModal open={status.addliquidity} setOpen={() => modalStore.close('addliquidity')} title={'Add Liquidity'}>
      <AddLiquidity inputRef={inputRef} />
      <Grid item>
        <Button
          fullWidth
          sx={{ backgroundColor: '#305FF5', color: '#fff', borderRadius: '8px', mt: 2 }}
          children={'Add Liquidity'}
          onClick={() =>
            walletStore
              .addLiquidity(market.liquidityTokenId, ...inputRef.map((ref) => ref?.current?.value))
              .then((txid) => modalStore.open('wait', txid))
              .catch((e) => walletStore.catch(e, 'addLiquidity'))
              .finally(() => modalStore.close('addliquidity'))
          }
        />
      </Grid>
    </CModal>
  )
})
