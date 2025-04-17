import React, { FC, useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import { Box, Button, Typography } from "@mui/material";
import { formatCurrency } from "./helpers";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY ?? "",
  },
};

const Price: FC = () => {
  const {
    suiPrice,
    setSuiPrice,
    lovePrice,
    setLovePrice,
    seedPrice,
    setSeedPrice,
  } = useContext(AppContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchPrice = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=sui,slove,seed&vs_currencies=usd",
        options
      );
      const data = await response.json();
      setSuiPrice(data.sui.usd);
      setLovePrice(data.slove.usd);
      setSeedPrice(data.seed.usd);
    } catch (error) {
      console.error("Error fetching price data:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Typography variant="h4">Giá (USDT)</Typography>
        <Button variant="contained" onClick={fetchPrice} disabled={isUpdating}>
          Cập nhật
        </Button>
      </Box>
      <Box sx={{ minHeight: 80 }}>
        {isUpdating ? (
          <Typography variant="caption">Đang cập nhật...</Typography>
        ) : (
          <>
            <Typography variant="body2">
              SUI: {formatCurrency(suiPrice)}
            </Typography>
            <Typography variant="body2">
              SLOVE: {formatCurrency(lovePrice)}
            </Typography>
            <Typography variant="body2">
              SEED: {formatCurrency(seedPrice)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Price;
