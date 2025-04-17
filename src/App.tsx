import React, { createContext, FC, useMemo, useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AgingFibonacciTracker from "./AgingFibonacciTracker";
import EnergyMons from "./EnergyMons";
import Price from "./Price";
import LevelMons from "./LevelMons";
import Cost from "./Cost";

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
      "Montserrat",
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

type AppContextProps = {
  suiPrice: number;
  lovePrice: number;
  seedPrice: number;
  costNoBoost: number;
  costHasBoost: number;
  totalHoursToUpgrade: number;
  setSuiPrice: React.Dispatch<React.SetStateAction<number>>;
  setLovePrice: React.Dispatch<React.SetStateAction<number>>;
  setSeedPrice: React.Dispatch<React.SetStateAction<number>>;
  setCostNoBoost: React.Dispatch<React.SetStateAction<number>>;
  setCostHasBoost: React.Dispatch<React.SetStateAction<number>>;
  setTotalHoursToUpgrade: React.Dispatch<React.SetStateAction<number>>;
};

export const AppContext = createContext<AppContextProps>({
  suiPrice: 2,
  lovePrice: 0.09,
  seedPrice: 0.0003,
  costNoBoost: 0,
  costHasBoost: 0,
  totalHoursToUpgrade: 0,
  setSuiPrice: () => {},
  setLovePrice: () => {},
  setSeedPrice: () => {},
  setCostNoBoost: () => {},
  setCostHasBoost: () => {},
  setTotalHoursToUpgrade: () => {},
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [suiPrice, setSuiPrice] = useState(2);
  const [lovePrice, setLovePrice] = useState(0.09);
  const [seedPrice, setSeedPrice] = useState(0.0003);
  const [costNoBoost, setCostNoBoost] = useState(0);
  const [costHasBoost, setCostHasBoost] = useState(0);
  const [totalHoursToUpgrade, setTotalHoursToUpgrade] = useState(0);

  const value = useMemo(() => {
    return {
      suiPrice,
      lovePrice,
      setSuiPrice,
      setLovePrice,
      seedPrice,
      setSeedPrice,
      costNoBoost,
      setCostNoBoost,
      costHasBoost,
      setCostHasBoost,
      totalHoursToUpgrade,
      setTotalHoursToUpgrade,
    };
  }, [
    suiPrice,
    lovePrice,
    seedPrice,
    setSuiPrice,
    setLovePrice,
    setSeedPrice,
    costNoBoost,
    setCostNoBoost,
    costHasBoost,
    setCostHasBoost,
    totalHoursToUpgrade,
    setTotalHoursToUpgrade,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const App: FC = () => {
  const [tabIndex, setTabIndex] = useState("1");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <Tabs value={tabIndex} onChange={handleChangeTab}>
              <Tab value="1" label="Tuổi của Mons" />
              <Tab value="2" label="Năng lượng" />
              <Tab value="3" label="Nâng cấp" />
              <Tab value="4" label="Chi phí" />
            </Tabs>
          </Box>

          <Price />

          <Box sx={{ py: 5 }}>
            {tabIndex === "1" && <AgingFibonacciTracker />}
            {tabIndex === "2" && <EnergyMons />}
            <Box sx={{ display: tabIndex === "3" ? "block" : "none" }}>
              <LevelMons />
            </Box>
            {tabIndex === "4" && <Cost />}
          </Box>
        </Container>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
