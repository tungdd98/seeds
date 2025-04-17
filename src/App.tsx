import React, { useState, useMemo } from "react";
import {
  TextField,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

// Generate Fibonacci sequence until the next term reaches the specified threshold
const generateFibonacciUntil = (threshold: number) => {
  const fib = [1, 1];
  while (fib[fib.length - 1] < threshold) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
};

export default function AgingFibonacciTracker() {
  const [energyPerHunt, setEnergyPerHunt] = useState(10);

  const stats = useMemo(() => {
    const statsArr: any = [];
    if (energyPerHunt <= 0) return statsArr;

    const baseResource = 100;
    // Build Fibonacci until reduction percent can zero out resource
    const fib = generateFibonacciUntil(100);

    let totalEnergyLost = 0;
    let age = 0;

    // Loop until resourceGain falls to zero
    while (true) {
      totalEnergyLost += energyPerHunt;
      if (totalEnergyLost >= (age + 1) * 100) {
        age++;
      }

      const reductionPercent = age === 0 ? 0 : fib[age - 1];
      const resourceMultiplier = Math.max(0, 1 - reductionPercent / 100);
      const resourceGain = baseResource * resourceMultiplier;

      statsArr.push({
        age,
        totalEnergyLost,
        resourceMultiplier: (resourceMultiplier * 100).toFixed(2) + "%",
        resourceGain: resourceGain.toFixed(2),
      });

      // Stop when resource can no longer be harvested
      if (resourceGain <= 0) break;
    }

    return statsArr;
  }, [energyPerHunt]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Fibonacci Aging & Resource Tracker
        </Typography>

        <TextField
          label="Năng lượng tiêu hao mỗi lần đi săn"
          type="number"
          value={energyPerHunt}
          onChange={(e) => setEnergyPerHunt(Number(e.target.value))}
          fullWidth
          margin="normal"
        />

        <Typography variant="body2" gutterBottom>
          Số ngày đi săn tối đa: {stats.length}
        </Typography>

        <Paper elevation={3} style={{ marginTop: 20 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ fontWeight: 900 }}>
                <TableCell>Tuổi</TableCell>
                <TableCell>Tổng năng lượng đã mất</TableCell>
                <TableCell>Tài nguyên còn lại (%)</TableCell>
                <TableCell>Tài nguyên săn được</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((row: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.totalEnergyLost}</TableCell>
                  <TableCell>{row.resourceMultiplier}</TableCell>
                  <TableCell>{row.resourceGain}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
