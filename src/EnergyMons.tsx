import React, { FC, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Box,
} from "@mui/material";

const initialSeedMons = [
  { name: "Common", energyBonus: 0, energyBase: 2, quantity: 8 },
  { name: "Uncommon", energyBonus: 1, energyBase: 4, quantity: 1 },
  { name: "Rare", energyBonus: 2, energyBase: 9, quantity: 0 },
  { name: "Epic", energyBonus: 3, energyBase: 12, quantity: 0 },
  { name: "Legend", energyBonus: 4, energyBase: 15, quantity: 0 },
];

const EnergyMons: FC = () => {
  const [seedMons, setSeedMons] = useState(initialSeedMons);

  const handleQuantityChange = (index: number, value: string) => {
    const updatedMons = [...seedMons];
    updatedMons[index].quantity = parseInt(value) || 0;
    setSeedMons(updatedMons);
  };

  const totalMons = seedMons.reduce((sum, m) => sum + m.quantity, 0);
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
    (sum, mon) => sum + mon.energyBonus * mon.quantity,
    0
  );
  const totalEnergy = totalEnergyBase + totalEnergyBonus;

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Năng lượng
        </Typography>
        <Typography variant="caption">Năng lượng tối đa: 20</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SEED Mon</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Năng lượng cộng thêm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seedMons.map((mon, index) => (
              <TableRow key={mon.name}>
                <TableCell>{mon.name}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={mon.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    inputProps={{ min: 0 }}
                  />
                </TableCell>
                <TableCell>{mon.energyBonus * mon.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper elevation={3} sx={{ p: 2, mt: 5 }}>
        <Typography variant="h6">Chi tiết</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Năng lượng mặc định</TableCell>
              <TableCell>{totalEnergyBase}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Năng lượng cộng thêm</TableCell>
              <TableCell>{totalEnergyBonus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>Tổng năng lượng</strong>
              </TableCell>
              <TableCell>
                <strong>{totalEnergy}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default EnergyMons;
