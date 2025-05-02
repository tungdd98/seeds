import React, { createContext, FC, useMemo, useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AgingFibonacciTracker from "./components/AgingFibonacciTracker";
import EnergyMons from "./components/EnergyMons";
import Price from "./components/Price";
import LevelMons from "./components/LevelMons";
import Cost from "./components/Cost";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "-apple-system"].join(","),
  },
});

type SeedMon = {
  name: string;
  energyBonus: number;
  energyBase: number;
  quantity: string;
  price: string;
};

const initialSeedMons: SeedMon[] = [
  { name: "Common", energyBonus: 0, energyBase: 2, quantity: "0", price: "0" },
  {
    name: "Uncommon",
    energyBonus: 1,
    energyBase: 4,
    quantity: "0",
    price: "0",
  },
  { name: "Rare", energyBonus: 2, energyBase: 9, quantity: "0", price: "0" },
  { name: "Epic", energyBonus: 3, energyBase: 12, quantity: "0", price: "0" },
  { name: "Legend", energyBonus: 4, energyBase: 15, quantity: "0", price: "0" },
];

type AppContextProps = {
  suiPrice: number;
  lovePrice: number;
  seedPrice: number;
  costNoBoost: number;
  costHasBoost: number;
  totalHoursToUpgrade: number;
  currentLevel: number;
  upgradeLevel: number;
  seedMons: SeedMon[];
  totalPriceBuyMons: number;
  setTotalPriceBuyMons: React.Dispatch<React.SetStateAction<number>>;
  setSuiPrice: React.Dispatch<React.SetStateAction<number>>;
  setLovePrice: React.Dispatch<React.SetStateAction<number>>;
  setSeedPrice: React.Dispatch<React.SetStateAction<number>>;
  setCostNoBoost: React.Dispatch<React.SetStateAction<number>>;
  setCostHasBoost: React.Dispatch<React.SetStateAction<number>>;
  setTotalHoursToUpgrade: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  setUpgradeLevel: React.Dispatch<React.SetStateAction<number>>;
  setSeedMons: React.Dispatch<React.SetStateAction<SeedMon[]>>;
};

export const AppContext = createContext<AppContextProps>({
  suiPrice: 0,
  lovePrice: 0,
  seedPrice: 0,
  costNoBoost: 0,
  costHasBoost: 0,
  totalHoursToUpgrade: 0,
  currentLevel: 0,
  upgradeLevel: 0,
  seedMons: [],
  totalPriceBuyMons: 0,
  setTotalPriceBuyMons: () => {},
  setSuiPrice: () => {},
  setLovePrice: () => {},
  setSeedPrice: () => {},
  setCostNoBoost: () => {},
  setCostHasBoost: () => {},
  setTotalHoursToUpgrade: () => {},
  setCurrentLevel: () => {},
  setUpgradeLevel: () => {},
  setSeedMons: () => {},
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [suiPrice, setSuiPrice] = useState(0);
  const [lovePrice, setLovePrice] = useState(0);
  const [seedPrice, setSeedPrice] = useState(0);
  const [costNoBoost, setCostNoBoost] = useState(0);
  const [costHasBoost, setCostHasBoost] = useState(0);
  const [totalHoursToUpgrade, setTotalHoursToUpgrade] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [seedMons, setSeedMons] = useState(initialSeedMons);
  const [totalPriceBuyMons, setTotalPriceBuyMons] = useState(0);

  const value = useMemo(() => {
    return {
      suiPrice,
      setSuiPrice,
      lovePrice,
      setLovePrice,
      seedPrice,
      setSeedPrice,
      costNoBoost,
      setCostNoBoost,
      costHasBoost,
      setCostHasBoost,
      totalHoursToUpgrade,
      setTotalHoursToUpgrade,
      currentLevel,
      setCurrentLevel,
      upgradeLevel,
      setUpgradeLevel,
      seedMons,
      setSeedMons,
      totalPriceBuyMons,
      setTotalPriceBuyMons,
    };
  }, [
    suiPrice,
    setSuiPrice,
    lovePrice,
    setLovePrice,
    seedPrice,
    setSeedPrice,
    costNoBoost,
    setCostNoBoost,
    costHasBoost,
    setCostHasBoost,
    totalHoursToUpgrade,
    setTotalHoursToUpgrade,
    currentLevel,
    setCurrentLevel,
    upgradeLevel,
    setUpgradeLevel,
    seedMons,
    setSeedMons,
    totalPriceBuyMons,
    setTotalPriceBuyMons,
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
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              scrollButtons='auto'
              variant='scrollable'>
              <Tab
                value='1'
                label='Tuổi của Mons'
              />
              <Tab
                value='2'
                label='Năng lượng'
              />
              <Tab
                value='3'
                label='Nâng cấp'
              />
              <Tab
                value='4'
                label='Chi phí'
              />
            </Tabs>
          </Box>

          <Price />

          <Box sx={{ py: 5 }}>
            {tabIndex === "1" && <AgingFibonacciTracker />}
            {tabIndex === "2" && <EnergyMons />}
            {tabIndex === "3" && <LevelMons />}
            {tabIndex === "4" && <Cost />}
          </Box>
        </Container>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
