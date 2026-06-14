// src/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F3A5F", // deep navy
    },
    secondary: {
      main: "#7A8450", // muted olive
    },
    background: {
      default: "#F5F3EF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Arial", sans-serif`,
    h5: {
      letterSpacing: "-0.02em",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.18)",
        },
      },
    },
  },
});

export default theme;