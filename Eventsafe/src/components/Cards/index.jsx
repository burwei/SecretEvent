import React from 'react';
import { Box, Typography } from '@mui/material';
import topImg from '@/assets/img/bg_box_1.png';
import bottomImg from '@/assets/img/bg_bt_box_1.png';
import numBoxImg from '@/assets/img/bg_num_box1.png';

const FeatureCard = ({ icon, feature, desc, number }) => {
  return (
    <Box sx={{
      width: 280,
      height: 500,
      position: 'relative',
      color: 'white',
      transition: '0.3s',
      '&:hover': {
        transform: 'translateY(-10px)'
      }
    }}>
      <Box
        sx={{
          width: '100%',
          minWidth: 280,
          height: '50%',
          position: 'absolute',
          top: 0,
          backgroundImage: `url(${topImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '58px 30px 33px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <img src={icon} alt="Icon" style={{ marginTop: '-4rem', width: '140px', height: 'auto' }} />
        <Typography
          variant="h3"
          sx={{
            fontSize: '1.5em', marginBottom: '0.5em', transition: 'color 0.3s',
            '&:hover': {
              color: 'rgb(115, 235, 4)',
            },
          }}
        >
          {feature}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{desc}</Typography>
      </Box>
      <Box
        sx={{
          width: '90%',
          height: '30%',
          position: 'absolute',
          left: '50%',
          bottom: 127,
          transform: 'translateX(-49%)',
          backgroundImage: `url(${bottomImg})`,
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          width: 40,
          height: 45,
          position: 'absolute',
          bottom: 140,
          left: '53%',
          fontSize: '25px',
          fontFamily: 'resobot-bold',
          lineHeight: 1.4,
          backgroundImage: `url(${numBoxImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {number}
      </Box>
    </Box>
  );
};

export default FeatureCard;
