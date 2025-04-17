import React, { FC, useContext } from "react";
import { AppContext } from "./App";
import { Box, Grid, TextField, Typography } from "@mui/material";

const Price: FC = () => {
  const {
    suiPrice,
    setSuiPrice,
    lovePrice,
    setLovePrice,
    seedPrice,
    setSeedPrice,
  } = useContext(AppContext);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Giá (USDT)
      </Typography>
      <Grid container spacing={2}>
        <Grid size={4}>
          <TextField
            label="SUI"
            type="number"
            value={suiPrice}
            onChange={(e) => setSuiPrice(Number(e.target.value))}
            margin="normal"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={4}>
          <TextField
            label="SLOVE"
            type="number"
            value={lovePrice}
            onChange={(e) => setLovePrice(Number(e.target.value))}
            margin="normal"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={4}>
          <TextField
            label="SEED"
            type="number"
            value={seedPrice}
            onChange={(e) => setSeedPrice(Number(e.target.value))}
            margin="normal"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Price;
