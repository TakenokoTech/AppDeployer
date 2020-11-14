import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import DataSource, { AppInfo } from "../components/DataSource";
import Detail from "./container/Detail";
import Header from "./container/Header";
import History from "./container/History";
import Summary from "./container/Summary";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Home(appInfo: AppInfo): JSX.Element {
  const classes = useStyles();

  const changeItem = async (commit: string) => {
    console.log(commit);
    // appInfo = await DataSource.getAppInfo(commit);
  };

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Summary appInfo={appInfo} />
            <Detail appInfo={appInfo} />
          </Grid>
          <Grid item md={3} xs={12}>
            <History appInfo={appInfo} changeItem={changeItem} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Home.getInitialProps = async () => {
  const appInfo = await DataSource.getAppInfo();
  return appInfo;
};
