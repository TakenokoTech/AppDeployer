import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#556cd6",
      main: "#ffb96e",
      light: "#FFD7AD",
      dark: "#FF9A2E",
      contrastText: "#fff",
    },
    secondary: {
      // main: "#19857b",
      main: "#DB6C79",
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
