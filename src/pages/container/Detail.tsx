import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import React from "react";
import { AppInfo, initAppInfo } from "../../components/DataSource";
import QrUtil from "../../components/QrUtil";

const useStyles = makeStyles(() => ({
  canvas: {
    padding: "16px 32px",
  },
}));

export default function Detail(props: { appInfo: AppInfo }) : JSX.Element {
  const classes = useStyles();

  const { appInfo } = props;
  const { text, link } = appInfo || initAppInfo;

  function FormRow(args: { value1: string; value2: string; link: string }) {
    return (
      <Box p={1}>
        <Grid container item xs={12}>
          <Grid item xs={5} sm={6}>
            <Typography variant="body1">
              <b>{args.value1}</b>
            </Typography>
          </Grid>
          <Grid item xs={7} sm={6}>
            <Typography variant="body1">
              {args.link ? (
                <Link href={args.link}>{args.value2}</Link>
              ) : (
                args.value2
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
            <Grid item xs={1} sm={2} />
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
                <canvas
                  className={classes.canvas}
                  ref={(el) => QrUtil.renderQR(el, "http://takenoko.tech")}
                  width="160"
                  height="160"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" css={{ height: "100%" }}>
                <Box flexGrow={1}>
                  <Box py={1} pr={2}>
                    QRコードまたはファイルから端末にインストールできます。
                  </Box>
                  <Box py={1} pr={2} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<ArrowDownward />}
                    >
                      Download
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} sm={2} />
          </Grid>
          <Box p={1} />
          <Divider style={{ width: "100%" }} />
          <Box p={3} />
          <Grid container spacing={1}>
            <Grid item xs={1} sm={2} />
            <Grid item xs={12} sm={8}>
              <FormRow
                value1="Upload Date"
                value2="2020/01/01 11:22"
                link={null}
              />
              <FormRow
                value1="Repository"
                value2={text.repository}
                link={link.repository}
              />
              <FormRow
                value1="Brunch"
                value2={text.branch}
                link={link.branch}
              />
              <FormRow
                value1="Commit"
                value2={text.commit}
                link={link.commit}
              />
              <FormRow value1="Log" value2={text.log} link={link.log} />
            </Grid>
            <Grid item xs={1} sm={2} />
          </Grid>
          <Box p={3} />
        </Grid>
      </Box>
    </Paper>
  );
}
