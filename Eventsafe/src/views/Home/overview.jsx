import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Single from "../Market/Single";
import { marketStore, observer } from "../../store";

export default observer(() => {
  const { markets } = marketStore;
  const [displayedMarkets, setDisplayedMarkets] = useState([]);

  useEffect(() => {
    marketStore.setMarkets();
  }, []);

  useEffect(() => {
    setDisplayedMarkets(markets.slice(0, 9));
  }, [markets]);

  const handleButtonClick = (filterType) => {
    let filteredMarkets;
    if (filterType === "unjudged") {
      filteredMarkets = markets.filter(({ winnerTokenType }) => winnerTokenType === 'Unknown');
    } else if (filterType === "judged") {
      filteredMarkets = markets.filter(({ winnerTokenType }) => winnerTokenType !== 'Unknown');
    } else {
      filteredMarkets = markets;
    }

    setDisplayedMarkets(filteredMarkets);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" ml={4} mb={1}>
        <Button
          variant="outlined"
          onClick={() => handleButtonClick("all")}
          color='primary'
          sx={{ color: '#fff', padding: '10px' }}
        >
          All Tickets
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleButtonClick("unjudged")}
          color='primary'
          sx={{ color: '#fff' }}
        >
          unpledged Tickets
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleButtonClick("judged")}
          color='primary'
          sx={{ color: '#fff' }}
        >
          Redeemed Tickets
        </Button>
      </Box>


      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {displayedMarkets.map((market, index) => (
          <Box
            key={`market${market.liquidityTokenId}`}
            width={{ xs: '100%', sm: '50%', md: '30%' }}
            p={1}
          >
            <Single market={market} index={market.liquidityTokenId} />
          </Box>
        ))}
      </Box>

    </div>
  );
});
