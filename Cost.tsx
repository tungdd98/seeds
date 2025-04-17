import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useContext, useMemo, useState } from "react";
import { AppContext } from "./App";
import { formatCurrency } from "./helpers";

const Cost: FC = () => {
  const { costNoBoost, costHasBoost, totalHoursToUpgrade, lovePrice } =
    useContext(AppContext);
  const [lovePerDay, setLovePerDay] = useState(100);

  const daysToEarnNoBoost = useMemo(() => {
    if (costNoBoost > 0 && lovePerDay > 0) {
      return Math.ceil(
        Math.ceil(costNoBoost / (lovePerDay * lovePrice)) +
          7 +
          totalHoursToUpgrade / 24
      );
    }
    return 0;
  }, [costNoBoost, lovePerDay, totalHoursToUpgrade, lovePrice]);

  const daysToEarnHasBoost = useMemo(() => {
    if (costHasBoost > 0 && lovePerDay > 0) {
      return Math.ceil(
        Math.ceil(costHasBoost / (lovePerDay * lovePrice)) +
          7 +
          totalHoursToUpgrade / 24
      );
    }
    return 0;
  }, [costHasBoost, lovePerDay, totalHoursToUpgrade, lovePrice]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Chi phí
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Số SLOVE kiếm được trong 1 ngày</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  size="small"
                  value={lovePerDay}
                  onChange={(e) => setLovePerDay(Number(e.target.value))}
                  inputProps={{ min: 0 }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Số ngày delay khi rút SLOVE</TableCell>
              <TableCell>7 ngày</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Số SLOVE tối thiếu khi rút</TableCell>
              <TableCell>100 SLOVE</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hoà vốn (không boost)</TableCell>
              <TableCell>
                {formatCurrency(costNoBoost)} ~ {daysToEarnNoBoost} ngày
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Số ngày để hoà vốn (có boost)</TableCell>
              <TableCell>
                {formatCurrency(costHasBoost)} - {daysToEarnHasBoost} ngày
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Cost;
