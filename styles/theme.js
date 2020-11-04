import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#556cd6",
      main: "#f98e1b",
      light: "#FFD7AD",
      dark: "#ea6700",
      contrastText: "#fff",
    },
    secondary: {
      // main: "#19857b",
      main: "#DB6C79",
      light: "#DB6C79",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
