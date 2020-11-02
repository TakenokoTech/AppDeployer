import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({}));

export default function Summary() {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Box p={3} m={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Summary
        </Typography>
      </Box>
    </Paper>
  );
}
