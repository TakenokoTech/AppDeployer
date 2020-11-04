import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0px",
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
    position: "relative",
    background: theme.palette.primary.light,
  },
  itemBaseSelectedBar: {
    position: "absolute",
    background: theme.palette.primary.dark,
    width: "4px",
    height: "100%",
    left: "0px",
  },
  button: {
    width: "100%",
    "&:hover, &$focusVisible": {
      "& $itemBase": {
        background: "#FCFCFC",
      },
    },
  },
}));

export default function History() {
  const classes = useStyles();

  const listItem = (isSelected) => {
    return (
      <ButtonBase focusRipple className={classes.button}>
        <ListItem
          className={isSelected ? classes.itemBaseSelected : classes.itemBase}
        >
          <div
            className={
              isSelected ? classes.itemBaseSelectedBar : classes.itemBase
            }
          />
          <div>
            <p>2020/01/01 11:22</p>
            <p>#234lk2</p>
            <p>commit comment</p>
          </div>
        </ListItem>
      </ButtonBase>
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
