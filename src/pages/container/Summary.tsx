import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AppInfo } from "../../components/DataSource";

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

export default function Summary(props: { appInfo: AppInfo }) : JSX.Element {
  const classes = useStyles();

  const { appInfo } = props;
  const {
    logoImg, packageName, appName, uploadDate,
  } = appInfo;
  const { branch } = appInfo.text;

  return (
    <Paper elevation={3}>
      <Box p={3} my={3}>
        <Grid container spacing={1}>
          <Grid item xs={3} sm={4} className={classes.logoContainer}>
            <img className={classes.logoImg} src={logoImg} alt="" />
          </Grid>
          <Grid item xs sm>
            <Box component="div" py={2}>
              <Typography variant="subtitle1">{packageName}</Typography>
              <Typography variant="h3">{appName}</Typography>
            </Box>
            <Box component="div" py={2}>
              <Typography variant="body1">
                {`Brunch: ${branch}`}
              </Typography>
              <Typography variant="body1">
                {`Upload Date: ${uploadDate}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
