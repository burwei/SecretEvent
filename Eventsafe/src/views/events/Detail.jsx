import { Button, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { marketStore, walletStore, observer } from '../../store'
import Presentation from './Presentation'
import Operation from './Operation'
import SingleSide from './SingleSide'

export default observer(() => {
  const navigate = useNavigate()
  const { market, markets } = marketStore
  const { addressHash } = walletStore
  const market_lid = Number(sessionStorage.getItem('market_lid') ?? 0)
  const routes = sessionStorage.getItem('routes')
  const expired = market.dueTimeStampMilliseconds < new Date().getTime()

  useEffect(() => {
    if (market_lid === 0) {
      navigate('/market')
      return
    } else marketStore.setMarkets(market_lid)
    if (markets.length === 0) marketStore.setMarkets()
  }, [])

  useEffect(() => {
    marketStore.getBalance(market.liquidityTokenId)
  }, [addressHash, market])

  return (
    <Grid container sx={{ maxWidth: '1200px', height: 'fit-content' }} spacing={1}>
      <Grid item xs={12}>
        <Button
          children={
            <>
              <span className="material-icons" style={{ color: '#fff', fontSize: '16px' }}>
                arrow_back_ios
              </span>
              <span>Back</span>
            </>
          }
          sx={{
            borderRadius: '8px',
            color: '#fff',
            px: 2,
          }}
          onClick={() => navigate(routes ?? '/market')}
        />
      </Grid>

      <Grid item container direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Grid item container direction={'column'} xs={true} pr={1} sx={{ mb: '2em' }}>
          <Presentation market={market} index={market.liquidityTokenId} />
          <Operation market={market} expired={expired} />
        </Grid>

        <Grid item container direction={'column'} width={{ xs: '100%', lg: '360px' }}>
          <Button disableRipple sx={{ mt: -5, mb: 2, color: '#fff', padding: 0 }}> Other events </Button>
          {markets.length > 0 &&
            markets
              .filter(
                ({ liquidityTokenId: l, winnerTokenType: w, dueTimeStampMilliseconds: d }) =>
                  market_lid !== l && w === 'Unknown' && d > new Date().getTime(),
              )
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((m, i) => {
                return <SingleSide key={'SingleSide' + i} market={m} />
              })}
        </Grid>
      </Grid>
    </Grid>
  )
})
