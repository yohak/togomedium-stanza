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
});
