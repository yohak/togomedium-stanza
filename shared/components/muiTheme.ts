import { createTheme } from "@mui/material";
import { COLOR_PRIMARY, COLOR_WHITE, FONT_EN } from "./styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      contrastText: COLOR_WHITE,
    },
  },
  typography: {
    fontFamily: FONT_EN,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    MuiButton: {
      styleOverrides: {},
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          paddingRight: "12px",
          fontWeight: "500",
        },
      },
    },
  },
});
