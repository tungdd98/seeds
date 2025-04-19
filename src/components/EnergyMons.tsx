import React, { FC, useContext, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { formatCurrency } from "../helpers/helpers";
import NumberInput from "./common/NumberInput";
import { AppContext } from "../App";

const EnergyMons: FC = () => {
  const { suiPrice, seedMons, setSeedMons, setTotalPriceBuyMons } =
    useContext(AppContext);

  const handleQuantityChange = (index: number, value: string) => {
    const updatedMons = [...seedMons];
    updatedMons[index].quantity = value;
    setSeedMons(updatedMons);
  };

  const handlePriceChange = (index: number, value: string) => {
    const updatedMons = [...seedMons];
    updatedMons[index].price = value;
    setSeedMons(updatedMons);
  };

  const totalMons = seedMons.reduce((sum, m) => sum + Number(m.quantity), 0);
  const totalEnergyBase = useMemo(() => {
    switch (totalMons) {
      case 1:
        return 2;
      case 3:
        return 4;
      case 9:
        return 9;
      case 15:
        return 12;
      default:
        return 0;
    }
  }, [totalMons]);
  const totalEnergyBonus = seedMons.reduce(
    (sum, mon) => sum + mon.energyBonus * Number(mon.quantity),
    0
  );
  const totalEnergy = totalEnergyBase + totalEnergyBonus;
  const totalPrice = seedMons.reduce(
    (sum, mon) => sum + Number(mon.price) * Number(mon.quantity) * suiPrice,
    0
  );

  useEffect(() => {
    setTotalPriceBuyMons(totalPrice);
  }, [totalPrice, setTotalPriceBuyMons]);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant='h4'
          gutterBottom>
          Năng lượng
        </Typography>
        <Typography variant='caption'>Năng lượng tối đa: 20</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SEED Mon</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá (SUI)</TableCell>
              <TableCell>Năng lượng cộng thêm</TableCell>
              <TableCell>Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seedMons.map((mon, index) => (
              <TableRow key={mon.name}>
                <TableCell>{mon.name}</TableCell>
                <TableCell>
                  <NumberInput
                    size='small'
                    value={mon.quantity}
                    onChange={(value) => handleQuantityChange(index, value)}
                  />
                </TableCell>
                <TableCell>
                  <NumberInput
                    size='small'
                    value={mon.price}
                    onChange={(value) => handlePriceChange(index, value)}
                    mode='decimal'
                  />
                </TableCell>
                <TableCell>{mon.energyBonus * Number(mon.quantity)}</TableCell>
                <TableCell>
                  {formatCurrency(
                    Number(mon.price) * Number(mon.quantity) * suiPrice
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        elevation={3}
        sx={{ p: 2, mt: 5 }}>
        <Typography variant='h6'>Chi tiết</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell width='50%'>Năng lượng mặc định</TableCell>
              <TableCell width='50%'>{totalEnergyBase}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='50%'>Năng lượng cộng thêm</TableCell>
              <TableCell width='50%'>{totalEnergyBonus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='50%'>
                <strong>Tổng năng lượng</strong>
              </TableCell>
              <TableCell width='50%'>
                <strong>{totalEnergy}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='50%'>
                <strong>Tổng tiền Mons</strong>
              </TableCell>
              <TableCell width='50%'>
                <strong>{formatCurrency(totalPrice)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default EnergyMons;
