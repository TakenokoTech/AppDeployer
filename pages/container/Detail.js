import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { renderQR } from "../component/qr";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  canvas: {
    padding: "16px 32px",
  },
}));

export default function Detail() {
  const classes = useStyles();

  function FormRow(props) {
    return (
      <Box p={1}>
        <Grid container item xs={12}>
          <Grid item xs={5} sm={6}>
            <Typography variant="body1">
              <b>{props.value1}</b>
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6}>
            <Typography variant="body1">
              {props.link ? (
                <Link href={props.link}>{props.value2}</Link>
              ) : (
                props.value2
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Paper elevation={4}>
      <Box p={3} m={1}>
        <Grid container spacing={3}>
          <Box p={1} />
          <Grid container>
            <Grid item xs={1} sm={2}></Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
                <canvas
                  className={classes.canvas}
                  ref={renderQR}
                  width="160"
                  height="160"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" css={{ height: "100%" }}>
                <Box flexGrow={1}>
                  <Box py={1}>
                    QRコードまたはファイルをダウンロードして端末にインストール
                  </Box>
                  <Box py={1} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="secondary">
                      Download
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} sm={2}></Grid>
          </Grid>
          <Box p={3} />
          <Grid container spacing={1}>
            <Grid item xs={1} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <FormRow
                value1="Upload Date"
                value2="2020/01/01 11:22"
                link={null}
              />
              <FormRow
                value1="Repository"
                value2="Repository"
                link="https://www.google.com/"
              />
              <FormRow
                value1="Brunch"
                value2="master"
                link="https://www.google.com/"
              />
              <FormRow
                value1="Commit"
                value2="3d1c536b90235a5...."
                link="https://www.google.com/"
              />
              <FormRow
                value1="Log"
                value2="PR-1:build"
                link="https://www.google.com/"
              />
            </Grid>
            <Grid item xs={1} sm={2}></Grid>
          </Grid>
          <Box p={3} />
        </Grid>
      </Box>
    </Paper>
  );
}
