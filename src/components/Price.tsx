import React, { FC, useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Box, Button, Typography } from "@mui/material";
import { formatCurrency } from "../helpers/helpers";

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
  const [isUpdating, setIsUpdating] = useState(true);

  const savePriceToLocalStorage = (key: string, value: number) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadPriceFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const fetchPrice = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=sui,slove,seed-3&vs_currencies=usd",
        options
      );
      const data = await response.json();
      savePriceToLocalStorage("suiPrice", data.sui.usd);
      savePriceToLocalStorage("lovePrice", data.slove.usd);
      savePriceToLocalStorage("seedPrice", data["seed-3"].usd);
      setSuiPrice(data.sui.usd);
      setLovePrice(data.slove.usd);
      setSeedPrice(data["seed-3"].usd);
    } catch (error) {
      console.error("Error fetching price data:", error);
      const localSuiPrice = loadPriceFromLocalStorage("suiPrice");
      const localLovePrice = loadPriceFromLocalStorage("lovePrice");
      const localSeedPrice = loadPriceFromLocalStorage("seedPrice");
      if (localSuiPrice) setSuiPrice(localSuiPrice);
      if (localLovePrice) setLovePrice(localLovePrice);
      if (localSeedPrice) setSeedPrice(localSeedPrice);
      alert("Lỗi khi lấy giá từ API. Đang sử dụng giá cũ.");
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
        <Typography variant='h4'>Giá (USDT)</Typography>
        <Button
          variant='contained'
          onClick={fetchPrice}
          disabled={isUpdating}>
          Cập nhật
        </Button>
      </Box>
      <Box sx={{ minHeight: 80 }}>
        {isUpdating ? (
          <Typography variant='caption'>Đang cập nhật...</Typography>
        ) : (
          <>
            <Typography variant='body2'>
              SUI: {formatCurrency(suiPrice)}
            </Typography>
            <Typography variant='body2'>
              SLOVE: {formatCurrency(lovePrice)}
            </Typography>
            <Typography variant='body2'>
              SEED: {formatCurrency(seedPrice, 4)}
            </Typography>
          </>
        )}
      </Box>
      <Typography
        variant='caption'
        sx={{ fontStyle: "italic" }}>
        Giá có thể sai do nhà cung cấp (coingecko) không cập nhật kịp thời
      </Typography>
    </Box>
  );
};

export default Price;
