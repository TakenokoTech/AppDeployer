import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Header from "./container/Header";
import Summary from "./container/Summary";
import Detail from "./container/Detail";
import History from "./container/History";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      {/* <Container maxWidth="lg"> */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Summary />
            <Detail />
          </Grid>
          <Grid item md={3} xs={12}>
            <History />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
