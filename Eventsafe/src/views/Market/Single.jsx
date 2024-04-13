import { Button, Grid, Typography, Box, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LazyLoadImage from '../Home/LazyLoadImage'
import official from '@/assets/img/official-badge.png';

export default ({ market, index }) => {
  const navigate = useNavigate()
  return (
    <Grid item xs={12} md={6} lg={4}
      sx={{
        backgroundColor: '#16182C',
        borderRadius: '20px',
        p: 3,
        mb: 2,
        border: '8px solid #070707',
        '&:hover': { backgroundColor: 'rgba(80,80,80,0.4)', cursor: 'pointer' },
        position: 'relative'
      }}
      onClick={() => {
        sessionStorage.setItem('market_lid', market.liquidityTokenId)
        navigate('/detail')
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <span
          style={{
            display: 'flex',
            color: '#fff',
            backgroundColor:
              market.dueTimeStampMilliseconds > new Date().getTime() && market.winnerTokenType === 'Unknown'
                ? '#305FF5'
                : { Unknown: '#6F767E', True: '#83BF6E', False: '#FF6A55' }[market.winnerTokenType],
            borderRadius: '6px',
            padding: '0 8px',
            height: '28px'
          }}
        >
          {market.dueTimeStampMilliseconds > new Date().getTime() && market.winnerTokenType === 'Unknown'
            ? 'Unjudged'
            : { Unknown: 'Expired', True: 'Yes', False: 'No' }[market.winnerTokenType]}
        </span>

        <LazyLoadImage
          key={index}
          src={`https://forelook-1301872035.cos.ap-shanghai.myqcloud.com/forelook_${index}.png`}
          alt={`img${index}`}
          width="70px"
          height="70px"
          borderRadius="20%"
        />
      </Box>


      <Box mb={2}>
        <Typography children={market.proposition} color={'#fff'} fontSize={'20px'} />
      </Box>
      
      <Box mb={3} display={'flex'} justifyContent={'space-between'}>
        <div
          style={{
            flexGrow: market.volume === '0.00' ? 1 : market.ratioTrue,
            backgroundColor: '#83BF6E',
            height: '4px',
            borderRadius: '2px',
          }}
        ></div>

        <div
          style={{
            flexGrow: market.volume === '0.00' ? 1 : market.ratioFalse,
            backgroundColor: '#FF6A55',
            height: '4px',
            borderRadius: '2px',
          }}
        ></div>
      </Box>
      <Box mb={2} display={'flex'} justifyContent={'space-between'}>
        
        <div style={{ display: 'flex' }}>
          <span style={{ color: '#6F767E', marginRight: '8px' }}>End</span>
          <span style={{ color: '#fff' }}>{`${market.dueTime[1]} ${market.dueTime[2]} ${market.dueTime[3]}`}</span>
        </div>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        
       
      </Box>

      <Tooltip title="It is an official event" >
        <img src={official} alt="Official" width="40px" height="40px" style={{ position: 'absolute', bottom: 4, right: 4 }}
        />
      </Tooltip>
    </Grid >
  )
}
