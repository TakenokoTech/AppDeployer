import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: "#ccc",
  },
  inline: {
    display: "inline",
  },
  header: {
    fontSize: "1.6em",
    padding: "16px",
  },
  itemBase: {
    background: theme.palette.background.paper,
  },
  itemBaseSelected: {
    background: "#FFB96E",
  },
}));

export default function History() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const listItem = (isSelected) => {
    return (
      <ListItem
        className={isSelected ? classes.itemBaseSelected : classes.itemBase}
      >
        <div>
          <p>2020/01/01 11:22</p>
          <p>#234lk2</p>
          <p>commit comment</p>
        </div>
      </ListItem>
    );
  };

  return (
    <Box p={0} my={3}>
      <Paper elevation={3}>
        <div className={classes.header}>History</div>
        <Divider />
        <List className={classes.root}>
          {listItem(true)}
          <Divider />
          {listItem(false)}
          <Divider />
          {listItem(false)}
          <Divider />
          {listItem(false)}
        </List>
      </Paper>
    </Box>
  );
}
