import { Grid, Stack, Typography, Button } from '@mui/material'
import { walletStore, marketStore, observer } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const table_xs = [6, 3, 1, 2]

const Propsition = observer(({ market, proposition, index }) => {
  const navigate = useNavigate()

  return (
    <Grid
      container
      sx={{
        backgroundColor: index % 2 === 0 ? 'rgba(39,43,48,0.5)' : '#16182C',
        '&:hover': {
          backgroundColor: index % 2 === 0 ? 'rgba(39,43,48,0.3)' : '#1a1a1a',
        },
        alignItems: 'center',
        py: 2,
      }}
    >
      <Grid item xs={table_xs[0]}>
        <Typography children={`${index + 1}.${market?.proposition}`} sx={{ color: '#6F767E', px: 2 }} />
      </Grid>
      <Grid item xs={table_xs[1]} textAlign={'center'}>
        <Typography children={`${proposition?.av ?? 0} / ${proposition?.bv ?? 0}`} sx={{ color: '#6F767E' }} />
      </Grid>
      <Grid item xs={table_xs[2]} textAlign={'center'}>
        <span style={{ color: '#6F767E' }}>
          {(market?.dueTimeStampMilliseconds ?? 0) > new Date().getTime() && market?.winnerTokenType === 'Unknown'
            ? 'Unjudged'
            : { Unknown: 'Expired', True: 'Yes', False: 'No' }[market?.winnerTokenType]}
        </span>
      </Grid>
      <Grid item xs={table_xs[3]} textAlign={'center'}>
        <Button
          sx={{ backgroundColor: '#254DC4', color: 'white', '&:hover': { bgcolor: '#5077f6' } }}
          onClick={() => {
            sessionStorage.setItem('market_lid', market?.liquidityTokenId)
            navigate('/detail')
          }}
          children={'Trade'}
        />
      </Grid>
    </Grid>
  )
})

export default observer(() => {
  const { addressHash } = walletStore
  const { balances, markets } = marketStore

  useEffect(() => {
    if (addressHash) {
      if (markets.length === 0) marketStore.setMarkets()
      marketStore.getBalances()
    }
  }, [addressHash])

  return (
    <Grid item container xs={12} sx={{ flexDirection: 'column', my: 2 }}>
      <Stack sx={{ mt: 1, borderRadius: '8px', py: 2, backgroundColor: '#16182C' }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Grid item xs={table_xs[0]}>
            <Typography children={'Propsition'} sx={{ color: '#6F767E', px: 2 }} fontSize={'18px'} />
          </Grid>
          <Grid item xs={table_xs[1]} textAlign={'center'}>
            <Typography children={'Balance'} sx={{ color: '#6F767E' }} fontSize={'18px'} />
            <Typography children={'(Yes/No)'} sx={{ color: '#6F767E' }} fontSize={'18px'} />
          </Grid>
          <Grid item xs={table_xs[2]} textAlign={'center'}>
            <Typography children={'Status'} sx={{ color: '#6F767E' }} fontSize={'18px'} />
          </Grid>
          <Grid item xs={table_xs[3]} textAlign={'center'}>
            <Typography children={'Operation'} sx={{ color: '#6F767E' }} fontSize={'18px'} />
          </Grid>
        </Grid>

        {balances.map((p, i) => {
          const market = markets.filter((m) => m.liquidityTokenId === p.lid)[0]
          return <Propsition key={'position' + i} market={market} proposition={p} index={i} />
        })}
      </Stack>
    </Grid>
  )
})
