import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() : JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Apricot
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
