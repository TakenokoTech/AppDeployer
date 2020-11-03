import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  logoContainer: {
    position: "relative",
  },
  logoImg: {
    position: "absolute",
    width: "50%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function Summary() {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Box p={3} my={3}>
        <Grid container spacing={1}>
          <Grid item xs={3} sm={4} className={classes.logoContainer}>
            <img className={classes.logoImg} src="apricot_img.png" />
          </Grid>
          <Grid item xs sm>
            <Box component="div" py={2}>
              <Typography variant="subtitle1">
                tach.takenoko.sampleapp
              </Typography>
              <Typography variant="h3">SampleApp</Typography>
            </Box>
            <Box component="div" py={2}>
              <Typography variant="body1">Brunch: master</Typography>
              <Typography variant="body1">
                Upload Date: 2020/01/01 11:22
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
