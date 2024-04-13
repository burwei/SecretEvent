import React, { useState, useEffect } from 'react';
import { Button, Grid, Select, MenuItem, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Box, List, ListItem, ListItemText, Collapse, Slide, useMediaQuery, Typography } from '@mui/material';
import { getPropositionByType } from '../../api/backendApi';
import { marketStore, observer } from '@/store';
import { walletStore } from '@/store';
import CreatePropsitionDialog from './Modals/Create';
import Single from './Single';
import CModal from '@/components/CModal';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

export default observer(() => {
  const { markets } = marketStore;
  const { address } = walletStore;
  const [displayedMarkets, setDisplayedMarkets] = useState(markets);

  useEffect(() => {
    sessionStorage.setItem('routes', '/market');
    marketStore.setMarkets();
  }, []);

  useEffect(() => {
    setDisplayedMarkets(markets);
  }, [markets]);

  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const gridXsSize = isSmScreen ? 12 : 2.5;
  const [openSidebar, setOpenSidebar] = useState(!isSmScreen);
  const [createDlag, setCreateDialog] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false)

  const [selectedSort, setSelectedSort] = useState('recentlyCreated');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVolume, setSelectedVolume] = useState('All');
  const [selectedEndDate, setSelectedEndDate] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [customVolumeMin, setCustomVolumeMin] = useState(0);
  const [customVolumeMax, setCustomVolumeMax] = useState(0);

  const [openState, setOpenState] = useState({
    riskLevel: true,
    categories: false,
    volume: false,
    endDate: false,
    status: false,
  });

  const handleOpen = (itemName) => {
    setOpenState((prevState) => ({
      ...prevState,
      riskLevel: itemName === 'riskLevel',
      categories: itemName === 'categories',
      volume: itemName === 'volume',
      endDate: itemName === 'endDate',
      status: itemName === 'status',
    }));
  };

  const handleFilterClick = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    let sortedMarkets;
    if (selectedSort === 'recentlyCreated') {
      sortedMarkets = [...markets].sort((a, b) => a.liquidityTokenId - b.liquidityTokenId);
    } else if (selectedSort === 'endingSoonest') {
      sortedMarkets = [...markets].sort((a, b) => a.dueTimeStampMilliseconds - b.dueTimeStampMilliseconds);
    } else {
      sortedMarkets = markets;
    }
    setSelectedSort(selectedSort);
    setDisplayedMarkets(sortedMarkets);
  };

  
  const handleCategoryChange = async (event) => {
    const category = event.target.value
    setSelectedCategory(category);
    if (category === 'All') {
      setDisplayedMarkets(markets)
      return
    }
    try {
      const filteredIds = await getPropositionByType(parseInt(category))
      const filteredMarkets = markets.filter(({ liquidityTokenId }) => filteredIds.data.includes(liquidityTokenId))
      setDisplayedMarkets(filteredMarkets)
    } catch (error) {
      console.error(error)
      setDisplayedMarkets(markets)
    }
  };

  


  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;
    const filteredMarkets = markets.filter(({ dueTimeStampMilliseconds }) => {
      if (selectedEndDate === 'Ends Today') {
        const today = new Date();
        const marketEndDate = new Date(dueTimeStampMilliseconds);
        return marketEndDate.toDateString() === today.toDateString();
      } else if (selectedEndDate === 'Ends This Week') {
        const today = new Date();
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6 - today.getDay());
        const marketEndDate = new Date(dueTimeStampMilliseconds);
        return marketEndDate <= endOfWeek;
      } else if (selectedEndDate === 'Ends This Month') {
        const today = new Date();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const marketEndDate = new Date(dueTimeStampMilliseconds);
        return marketEndDate <= endOfMonth;
      }
      return true;
    });
    setSelectedEndDate(selectedEndDate);
    setDisplayedMarkets(filteredMarkets);
  };


  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value
    const filteredMarkets = markets.filter(({ winnerTokenId }) => {
      if (selectedStatus === 'Active') {
        return winnerTokenId === 'Unknown'
      } else if (selectedStatus === 'Resolved') {
        return winnerTokenId !== 'Unknown'
      } else {
        return true
      }
    })
    setSelectedStatus(selectedStatus);
    setDisplayedMarkets(filteredMarkets)
  };

  const clearAll = () => {
    setSelectedRisk('All')
    setSelectedCategory('All')
    setSelectedVolume('All')
    setSelectedEndDate('All')
    setSelectedStatus('All')
    setCustomVolumeMin('')
    setCustomVolumeMax('')
  }

  return (
    <Grid container sx={{ maxWidth: '98%', height: 'fit-content', justifyContent: 'center', color: '#fff' }}>
      <CModal open={successCreate} setOpen={() => { setSuccessCreate(false) }} title={'Submit'}>
        <Grid item>
          <Typography sx={{ color: '#6F767E', fontSize: '16px', wordBreak: 'break-all' }}>
            🥳 You have successfully Got your ticket! <br />
          </Typography>
          <span
            className="material-icons-outlined"
            style={{ display: 'flex', justifyContent: 'center', color: '#83BF6E', fontSize: '72px', margin: '16px 0' }}
          >
            check_circle
          </span>
        </Grid>
      </CModal >
      <CreatePropsitionDialog open={createDlag} onClose={() => { setCreateDialog(false) }} setSuccess={() => setSuccessCreate(true)} />
      <Grid item container xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6} >
            <Button startIcon={<FilterListIcon />} variant='outlined' onClick={handleFilterClick} sx={{ color: '#fff' }}>
              Filters
            </Button>
          
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Select
              value={selectedSort}
              onChange={handleSortChange}
              MenuProps={{
                sx: { "&& .Mui-selected": { backgroundColor: "skyblue" } }
              }}
              sx={{
                borderRadius: '10px', border: '1px solid #5f9ff8', marginRight: '0.4em',
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(95, 159, 248, 0.7)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(95, 159, 248, 0.7)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(95, 159, 248, 0.7)',
                },
                '.MuiSvgIcon-root ': {
                  fill: "white !important",
                }
              }}
              inputProps={{ sx: { padding: '0.8em 0.5em', paddingLeft: '1em' } }}
            >
              <MenuItem value={'recentlyCreated'}> Recently Pledged </MenuItem>
              <MenuItem value={'endingSoonest'}> Ending Soonest </MenuItem>
            </Select>
            {
              <Button variant='contained' sx={{
                color: '#fff', padding: '0.6em', borderRadius: '10px', backgroundColor: '#354dac',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: 'blue',
                }
              }
              }
                onClick={() => { setCreateDialog(true) }}>
                Get ticket
              </Button>
            }
          </Grid>
        </Grid>

        {openSidebar &&
          <Grid item xs={gridXsSize} sx={{ marginTop: '2em' }}>
            <Collapse in={true} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem onClick={() => handleOpen('riskLevel')}>
                  <ListItemText primary='Risk Level' sx={{ color: '#fff' }} />
                  {openState.riskLevel ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {openState.riskLevel && (
                  <List component='div' disablePadding>
                    <ListItem >
                     
                    </ListItem>
                  </List>
                )}

                <ListItem onClick={() => handleOpen('categories')}>
                  <ListItemText primary='Categories' sx={{ color: '#fff' }} />
                  {openState.categories ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {openState.categories && (
                  <List component='div' disablePadding>
                    <ListItem >
                      <RadioGroup
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        sx={{ color: '#fff' }}
                      >
                        <FormControlLabel value='All' control={<Radio sx={{ color: '#fff' }} />} label='All' />
                        <FormControlLabel value='0' control={<Radio sx={{ color: '#fff' }} />} label='Business' />
                        <FormControlLabel value='1' control={<Radio sx={{ color: '#fff' }} />} label='Crypto' />
                        <FormControlLabel value='2' control={<Radio sx={{ color: '#fff' }} />} label='Politics' />
                        <FormControlLabel value='3' control={<Radio sx={{ color: '#fff' }} />} label='Pop' />
                        <FormControlLabel value='4' control={<Radio sx={{ color: '#fff' }} />} label='Sports' />
                      </RadioGroup>
                    </ListItem>
                  </List>
                )}


                <ListItem onClick={() => handleOpen('endDate')}>
                  <ListItemText primary='End Date' sx={{ color: '#fff' }} />
                  {openState.endDate ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {openState.endDate && (
                  <List component='div' disablePadding>
                    <ListItem >
                      <RadioGroup
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                        sx={{ color: '#fff' }}
                      >
                        <FormControlLabel value='All' control={<Radio sx={{ color: '#fff' }} />} label='All' />
                        <FormControlLabel value='Ends Today' control={<Radio sx={{ color: '#fff' }} />} label='Ends Today' />
                        <FormControlLabel value='Ends This Week' control={<Radio sx={{ color: '#fff' }} />} label='Ends This Week' />
                        <FormControlLabel value='Ends This Month' control={<Radio sx={{ color: '#fff' }} />} label='Ends This Month' />
                      </RadioGroup>
                    </ListItem>
                  </List>
                )}

               
              </List>
            </Collapse>
          </Grid>
        }

        <Grid item xs={openSidebar && !isSmScreen ? 9.5 : 12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Slide direction="up" in={true} key={displayedMarkets}>
            <Grid item container xs={12}>
              {displayedMarkets.length > 0 ? (
                displayedMarkets.map((market) => (
                  <Single key={'market' + market.liquidityTokenId} market={market} index={market.liquidityTokenId} />
                ))
              ) : (
                <div style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>
                  <p>No results found</p>
                </div>
              )}
            </Grid>
          </Slide>
        </Grid>
      </Grid>
    </Grid >
  );
});
