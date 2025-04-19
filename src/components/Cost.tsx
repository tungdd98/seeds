import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { FC, useContext, useMemo, useState } from "react";
import { AppContext } from "../App";
import { formatCurrency } from "../helpers/helpers";
import NumberInput from "./common/NumberInput";

const delayWithDraw = 7; // days
const defaultLovePerDay = 100; // SLOVE

const Cost: FC = () => {
  const {
    costNoBoost,
    costHasBoost,
    totalHoursToUpgrade,
    lovePrice,
    totalPriceBuyMons,
  } = useContext(AppContext);
  const [lovePerDay, setLovePerDay] = useState(defaultLovePerDay);

  const daysToEarnNoBoost = useMemo(() => {
    const totalPrice = costNoBoost + totalPriceBuyMons;

    if (totalPrice > 0 && lovePerDay > 0) {
      return Math.ceil(
        Math.ceil(totalPrice / (lovePerDay * lovePrice)) +
          delayWithDraw +
          totalHoursToUpgrade / 24
      );
    }

    return 0;
  }, [
    costNoBoost,
    lovePerDay,
    totalHoursToUpgrade,
    lovePrice,
    totalPriceBuyMons,
  ]);

  const daysToEarnHasBoost = useMemo(() => {
    const totalPrice = costHasBoost + totalPriceBuyMons;

    if (totalPrice > 0 && lovePerDay > 0) {
      return Math.ceil(Math.ceil(totalPrice / (lovePerDay * lovePrice)) + 7);
    }

    return 0;
  }, [
    costHasBoost,
    lovePerDay,
    totalHoursToUpgrade,
    lovePrice,
    totalPriceBuyMons,
  ]);

  return (
    <>
      <Typography
        variant='h4'
        gutterBottom>
        Chi phí
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Số SLOVE kiếm được trong 1 ngày</TableCell>
              <TableCell>
                <NumberInput
                  size='small'
                  value={lovePerDay}
                  onChange={(value) => setLovePerDay(Number(value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Số ngày delay khi rút SLOVE</TableCell>
              <TableCell>{delayWithDraw} ngày</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Số SLOVE tối thiếu khi rút</TableCell>
              <TableCell>{defaultLovePerDay} SLOVE</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tổng tiền Mons</TableCell>
              <TableCell>{formatCurrency(totalPriceBuyMons)}</TableCell>
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
