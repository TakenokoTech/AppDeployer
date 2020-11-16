/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/destructuring-assignment */

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React from "react";
import DataSource, { AppInfo, initAppInfo } from "../components/DataSource";
import { initAccount } from "../components/GithubRepository";
import { getParam } from "../components/Util";
import Detail from "./container/Detail";
import Header from "./container/Header";
import History from "./container/History";
import Summary from "./container/Summary";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

interface HomeProps extends WithStyles<typeof styles> {
  classes: any;
}

interface HomeState {
  appInfo: AppInfo;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = { appInfo: initAppInfo };

    (async () => {
      const appInfo = await DataSource.getAppInfo();
      this.setState({ appInfo });
      await initAccount(getParam().code);
    })();
  }

  render() {
    const { classes } = this.props;
    const changeItem = async (commit: string) => {
      const appInfo = await DataSource.getAppInfo(commit);
      this.setState({ appInfo });
    };

    return (
      <div className={classes.root}>
        <Header />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={9} xs={12}>
              <Summary appInfo={this.state.appInfo} />
              <Detail appInfo={this.state.appInfo} />
            </Grid>
            <Grid item md={3} xs={12}>
              <History appInfo={this.state.appInfo} changeItem={changeItem} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
