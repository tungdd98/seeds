import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { FC, useContext, useEffect, useMemo } from "react";
import { AppContext } from "../App";
import { formatCurrency } from "../helpers/helpers";
import NumberInput from "./common/NumberInput";

const upgradeLevels = [
  { level: 0, priceLove: 0, priceSeed: 0, timeHour: 0 },
  { level: 1, priceLove: 1, priceSeed: 10, timeHour: 1 },
  { level: 2, priceLove: 2, priceSeed: 20, timeHour: 2 },
  { level: 3, priceLove: 3, priceSeed: 30, timeHour: 3 },
  { level: 4, priceLove: 4, priceSeed: 40, timeHour: 4 },
  { level: 5, priceLove: 20, priceSeed: 100, timeHour: 5 },
  { level: 6, priceLove: 9, priceSeed: 69, timeHour: 6 },
  { level: 7, priceLove: 10.5, priceSeed: 105, timeHour: 7 },
  { level: 8, priceLove: 12, priceSeed: 120, timeHour: 8 },
  { level: 9, priceLove: 13.5, priceSeed: 135, timeHour: 9 },
  { level: 10, priceLove: 30, priceSeed: 300, timeHour: 10 },
  { level: 11, priceLove: 16.5, priceSeed: 165, timeHour: 11 },
  { level: 12, priceLove: 18, priceSeed: 180, timeHour: 12 },
  { level: 13, priceLove: 19.5, priceSeed: 195, timeHour: 13 },
  { level: 14, priceLove: 21, priceSeed: 210, timeHour: 14 },
  { level: 15, priceLove: 22.5, priceSeed: 225, timeHour: 15 },
  { level: 16, priceLove: 24, priceSeed: 240, timeHour: 16 },
  { level: 17, priceLove: 25.5, priceSeed: 255, timeHour: 17 },
  { level: 18, priceLove: 27, priceSeed: 270, timeHour: 18 },
  { level: 19, priceLove: 28.5, priceSeed: 285, timeHour: 19 },
  { level: 20, priceLove: 60, priceSeed: 600, timeHour: 20 },
  { level: 21, priceLove: 31.5, priceSeed: 315, timeHour: 21 },
  { level: 22, priceLove: 33, priceSeed: 330, timeHour: 22 },
  { level: 23, priceLove: 34.5, priceSeed: 345, timeHour: 23 },
  { level: 24, priceLove: 36, priceSeed: 360, timeHour: 24 },
  { level: 25, priceLove: 37.5, priceSeed: 375, timeHour: 25 },
  { level: 26, priceLove: 39, priceSeed: 390, timeHour: 26 },
  { level: 27, priceLove: 40.5, priceSeed: 405, timeHour: 27 },
  { level: 28, priceLove: 42, priceSeed: 420, timeHour: 28 },
  { level: 29, priceLove: 43.5, priceSeed: 435, timeHour: 29 },
  { level: 30, priceLove: 100, priceSeed: 1000, timeHour: 30 },
];

const boostMons = 6; // SLOVE

const LevelMons: FC = () => {
  const {
    lovePrice,
    seedPrice,
    setCostNoBoost,
    setCostHasBoost,
    setTotalHoursToUpgrade,
    currentLevel,
    upgradeLevel,
    setCurrentLevel,
    setUpgradeLevel,
  } = useContext(AppContext);

  const loveNeedToUpgrade = useMemo(() => {
    if (currentLevel < upgradeLevel) {
      const totalLove = upgradeLevels
        .slice(currentLevel + 1, upgradeLevel + 1)
        .reduce((sum, level) => sum + level.priceLove, 0);
      return totalLove;
    }
    return 0;
  }, [currentLevel, upgradeLevel]);

  const seedNeedToUpgrade = useMemo(() => {
    if (currentLevel < upgradeLevel) {
      const totalSeed = upgradeLevels
        .slice(currentLevel + 1, upgradeLevel + 1)
        .reduce((sum, level) => sum + level.priceSeed, 0);
      return totalSeed;
    }
    return 0;
  }, [currentLevel, upgradeLevel]);

  const hourNeedToUpgrade = useMemo(() => {
    if (currentLevel < upgradeLevel) {
      const totalHour = upgradeLevels
        .slice(currentLevel + 1, upgradeLevel + 1)
        .reduce((sum, level) => sum + level.timeHour, 0);
      return totalHour;
    }
    return 0;
  }, [currentLevel, upgradeLevel]);

  const totalLoveToBoost = hourNeedToUpgrade * boostMons * lovePrice;
  const totalSeedToUpgrade = seedNeedToUpgrade * seedPrice;
  const totalLoveToUpgrade = loveNeedToUpgrade * lovePrice;

  useEffect(() => {
    setCostNoBoost(totalSeedToUpgrade + totalLoveToUpgrade);
    setCostHasBoost(totalSeedToUpgrade + totalLoveToUpgrade + totalLoveToBoost);
    setTotalHoursToUpgrade(hourNeedToUpgrade);
  }, [
    totalLoveToBoost,
    totalSeedToUpgrade,
    totalLoveToUpgrade,
    setCostNoBoost,
    setCostHasBoost,
    hourNeedToUpgrade,
    setTotalHoursToUpgrade,
  ]);

  return (
    <>
      <Typography
        variant='h4'
        gutterBottom>
        Nâng cấp
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Level hiện tại</TableCell>
              <TableCell>
                <NumberInput
                  size='small'
                  value={currentLevel}
                  onChange={(value) => setCurrentLevel(Number(value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Level cần nâng cấp</TableCell>
              <TableCell>
                <NumberInput
                  size='small'
                  value={upgradeLevel}
                  onChange={(value) => setUpgradeLevel(Number(value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SLOVE cần để nâng cấp</TableCell>
              <TableCell>
                {loveNeedToUpgrade} SLOVE ~ {formatCurrency(totalLoveToUpgrade)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SEED cần để nâng cấp</TableCell>
              <TableCell>
                {seedNeedToUpgrade} SEED ~ {formatCurrency(totalSeedToUpgrade)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tổng thời gian nâng cấp</TableCell>
              <TableCell>{hourNeedToUpgrade} giờ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chi phí Boost</TableCell>
              <TableCell>
                {hourNeedToUpgrade * boostMons} SLOVE ~{" "}
                {formatCurrency(totalLoveToBoost)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LevelMons;
