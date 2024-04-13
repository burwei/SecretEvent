import React, { useState, useEffect } from 'react'
import { Grid, Box, Divider, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getDescription } from '../../api/backendApi';

export default ({ market, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [firstSentence, setFirstSentence] = useState('');
  const [remainingContent, setRemainingContent] = useState('');

  const handleToggleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDescription(index);
      setFirstSentence(response.firstSentence);
      setRemainingContent(response.remainingContent);
    };

    fetchData();
  }, [index]);


  return (
    <div style={{ backgroundColor: '#16182C', marginBottom: '1em', borderRadius: '8px', }}>
      <Grid item xs={true} sx={{ p: 3, flexGrow: '0!important', display: 'flex' }}>
        <img src={`https://forelook-1301872035.cos.ap-shanghai.myqcloud.com/forelook_${index}.png`} alt={`img${index}`}
          style={{ width: '140px', height: '140px', borderRadius: '50%', marginLeft: '1em' }} />
        <div style={{ marginLeft: '2em' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
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
              }}
            >
              {market.dueTimeStampMilliseconds > new Date().getTime() && market.winnerTokenType === 'Unknown'
                ? 'Unjudged'
                : { Unknown: 'Expired', True: 'Yes', False: 'No' }[market.winnerTokenType]}
            </span>
          </Box>

          <Box mb={2}>
            <Typography children={market?.proposition} color={'#fff'} fontSize={'28px'} />
          </Box>

          <Box mb={2} flexDirection={{ xs: 'column', sm: 'row' }} display={'flex'}>
         
            <div style={{ display: 'flex' }}>
              <span style={{ color: '#6F767E', marginRight: '8px' }}>End</span>
              <span style={{ color: '#fff', marginRight: '16px' }}>{`${market?.dueTime ? `${market?.dueTime?.[1]} ${market?.dueTime?.[2]} ${market?.dueTime?.[3]}` : 0
                }`}</span>
            </div>

          </Box>
        </div>
      </Grid>

      {firstSentence && <div style={{ margin: '1em 5em', color: '#fff' }}>
        <Typography variant='h2' sx={{ marginTop: '-1em' }}>About</Typography>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)', borderWidth: '0.5px' }} />
        <Typography sx={{ textAlign: 'justify', marginTop: '1em', whiteSpace: 'pre-line' }}>
          {isExpanded ? `${firstSentence}\n\n${remainingContent.replace(/\n/g, '\n\n')}` : firstSentence}
        </Typography>

        <IconButton onClick={handleToggleShowMore} disableRipple
          sx={{
            textDecoration: 'none',
            color: '#fff',
            padding: 0,
            margin: '10px -5px ',
            fontWeight: 'bold',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          {isExpanded ? (
            <>
              <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                Show less
              </Typography>
              <ExpandLessIcon fontSize="small" />
            </>
          ) : (
            <>
              <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                Show more
              </Typography>
              <ExpandMoreIcon fontSize="small" />
            </>
          )}
        </IconButton>
      </div>
      }
    </div>
  )
}
