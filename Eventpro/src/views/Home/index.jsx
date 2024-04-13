import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import Overview from './overview';
import ExploreButton from '../../components/Buttons/explore';
import FeatureCard from '../../components/Cards';
import backgroundImg from '@/assets/img/background.jpeg';
import coverImg from '@/assets/img/cover.png';
import iconImg1 from '@/assets/img/icon1.webp';
import iconImg2 from '@/assets/img/icon2.webp';
import iconImg3 from '@/assets/img/icon3.webp';
import letterF from '@/assets/img/letterF.webp';
import letterL from '@/assets/img/letterL.webp';
import '@/index.css';

const features = [
  { icon: iconImg1, feature: 'Privacy', desc: 'Prophet is a decentralized platform where users can predict and trade real-world event outcomes.', number: 1 },
  { icon: iconImg2, feature: 'Security', desc: 'Prophet ensures secure transactions and protects user data through blockchain technology.', number: 2 },
  { icon: iconImg3, feature: 'Diversity', desc: 'Prophet offers a wide range of markets and events for users to engage in prediction and trading activities.', number: 3 },
];


const HomePage = () => {
  const navigate = useNavigate()
  const isLargeScreen = useMediaQuery('(min-width: 1100px)');
  const isMediumScreen = useMediaQuery('(min-width: 800px) and (max-width: 1100px)');

  const { ref: featuresRef, inView: isFeaturesInView } = useInView({
    triggerOnce: false,
  });
  const featuresElementRef = useRef();

  const { ref: propositionsRef, inView: isPropositionsInView } = useInView({
    triggerOnce: false,
  });
  const propositionsElementRef = useRef();

  useEffect(() => {
    if (isFeaturesInView) {
      featuresElementRef.current.classList.add('features-animate');
    } else {
      featuresElementRef.current.classList.remove('features-animate');
    }
  }, [isFeaturesInView]);

  useEffect(() => {
    if (isPropositionsInView) {
      propositionsElementRef.current.classList.add('propositions-animate');
    } else {
      propositionsElementRef.current.classList.remove('propositions-animate');
    }
  }, [isPropositionsInView]);

  return (
    <>
      <div
        className='introduction'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          margin: '-10px',
          paddingLeft: '5%',
          paddingRight: '5%',
          paddingBottom: '60px'
        }}
      >
        <Grid container style={{ color: 'white', padding: '5rem', height: '90vh' }}>
          <Grid item sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant='h1' gutterBottom sx={{ fontSize: '4rem' }}>Eventpro</Typography>
            <Typography variant='body1' sx={{ fontSize: '1.2rem', width: '90%' }}>Prophet is a revolutionary decentralized platform that allows users to speculate on the outcome of events. Join us to harness the power of collective intelligence and earn rewards!</Typography>
            <ExploreButton onClick={() => { sessionStorage.setItem('routes', '/market'); navigate('/market') }} />
          </Grid>
          <Grid item sm={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            <img src={letterF} alt='Letter1' style={{ width: '200px', height: '200px' }} className='other-image1' />
            <img src={letterL} alt='Letter2' style={{ width: '100px', height: '100px' }} className='other-image2' />
            <img src={coverImg} alt='Cover' style={{ maxWidth: '100%' }} className='image-section' />
          </Grid>
        </Grid>
      </div>

      <div className='features features-animate' ref={featuresRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3em' }}>
        <Typography variant='h2' sx={{ fontSize: '3rem', color: 'white' }}>Features</Typography>
        <Box className='features' sx={{ display: 'flex', justifyContent: 'center', margin: '3em 3em 0 0' }} ref={featuresElementRef}>
          <Grid container sx={{ justifyContent: 'center', textAlign: 'justify' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  width: isLargeScreen ? '25%' : isMediumScreen ? '50%' : '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  maxHeight: '25em',
                  margin: isLargeScreen ? '0 45px' : '0'
                }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </Grid>
        </Box>
      </div>

      <div className='propositions propositions-animate' ref={propositionsRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4em' }} >
        <Typography variant='h2' sx={{ fontSize: '3rem', color: 'white' }}>Tickets</Typography>
        <Box className='propositions' sx={{ display: 'flex', justifyContent: 'space-around', margin: '2em 0 1em 0' }} ref={propositionsElementRef}>
          <Overview />
        </Box>
      </div>
    </>
  );
};

export default HomePage;
