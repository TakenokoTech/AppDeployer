import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import QRCode from "qrcode";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  canvas: {
    float: "right",
    padding: "0 16px",
  },
}));

export default function Detail() {
  const classes = useStyles();

  async function renderQR(canves) {
    try {
      function qrGenerate(data) {
        const canvas = new OffscreenCanvas(1, 1);
        return new Promise((res, rej) =>
          QRCode.toCanvas(canvas, data, {}, (err) =>
            !err ? res(canvas) : rej(err)
          )
        );
      }
      canves
        .getContext("bitmaprenderer")
        .transferFromImageBitmap(
          (await qrGenerate("http://takenoko.tech")).transferToImageBitmap()
        );
    } catch (e) {}
  }

  function FormRow(props) {
    return (
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>{props.value1}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {props.link ? (
              <Link href={props.link}>{props.value2}</Link>
            ) : (
              props.value2
            )}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Paper elevation={3}>
      <Box p={3} m={3} pb={6}>
        <Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <canvas
                className={classes.canvas}
                ref={renderQR}
                width="180"
                height="180"
              />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" css={{ height: "100%" }}>
                <Box>
                  QRコードまたはファイルを
                  <br />
                  ダウンロードして端末にダウンロード
                  <br />
                  <br />
                  <Button variant="contained" color="secondary">
                    Download
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
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
                value2="3d1c53652b90235a28784b5...."
                link="https://www.google.com/"
              />
              <FormRow
                value1="Log"
                value2="PR-1:build"
                link="https://www.google.com/"
              />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
