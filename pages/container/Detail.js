import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import QRCode from "qrcode";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({}));

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

  return (
    <Paper elevation={3}>
      <Box p={3} m={3}>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.logoContainer}>
            <canvas ref={renderQR} width="240" height="240" />
            <Button variant="contained" color="secondary">
              Download
            </Button>
          </Grid>
          <Grid item xs>
            <p>tach.takenoko.sampleapp</p>
            <h1>SampleApp</h1>
            <p>Brunch: master</p>
            <p>Upload Date: 2020/01/01 11:22</p>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
