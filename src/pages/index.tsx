/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/destructuring-assignment */

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React from "react";
import DataSource, { AppInfo, initAppInfo, lastRepo } from "../components/DataSource";
import { getRepositories, initAccount, RepoItem } from "../components/GithubRepository";
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
  repos: RepoItem[];
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = { appInfo: initAppInfo, repos: [] };

    (async () => {
      await initAccount(getParam().code);
      const repos = await getRepositories();
      const appInfo = await DataSource.getAppInfo(lastRepo() || repos[0].name);
      this.setState({ repos, appInfo });
    })();
  }

  render() {
    const { classes } = this.props;
    const changeItem = async (commit: string) => {
      const { appInfo } = this.state;
      const newAppInfo = await DataSource.getAppInfo(appInfo.appName, commit);
      this.setState({ appInfo: newAppInfo });
    };
    const changeRepo = async (repoName: string) => {
      const newAppInfo = await DataSource.getAppInfo(repoName);
      this.setState({ appInfo: newAppInfo });
      sessionStorage.setItem("lastRepo", newAppInfo.appName);
    };

    return (
      <div className={classes.root}>
        <Header appInfo={this.state.appInfo} repos={this.state.repos} changeRepo={changeRepo} />
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
