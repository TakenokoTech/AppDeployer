import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

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
      default: "#fdfdfd",
    },
  },
  overrides: {
    MuiPaper: {
      elevation3: {
        boxShadow: "0px 0 1px 1px rgba(0,0,0,0.15);",
        borderRadius: "8px",
      },
    },
  },
});

export default theme;
