import React, { FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles.css";
import { Box } from "@mui/material";

import RichTextExample from "./editor/Editor";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "-apple-system"].join(","),
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, marginTop: 8 }}>
        <RichTextExample />
      </Box>
    </ThemeProvider>
  );
};

export default App;
