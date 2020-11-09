import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AppInfo, initAppInfo, HistoryItem } from "../../components/DataSource";
import { joinIndexed } from "../../components/Util";

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
    "&:hover": {
      "& $itemBase": {
        background: "#FCFCFC",
      },
    },
  },
}));

export default function History(props: { appInfo: AppInfo }): JSX.Element {
  const classes = useStyles();

  const { appInfo } = props;
  const { history } = appInfo || initAppInfo;

  const listItem = (item: HistoryItem, isSelected: boolean) => (
    <ButtonBase focusRipple className={classes.button} key={item.date}>
      <ListItem className={isSelected ? classes.itemBaseSelected : classes.itemBase}>
        <div className={isSelected ? classes.itemBaseSelectedBar : classes.itemBase} />
        <div>
          <p>{item.date}</p>
          <p>{item.commit}</p>
          <p>{item.comment}</p>
        </div>
      </ListItem>
    </ButtonBase>
  );

  return (
    <Box p={0} my={3}>
      <Paper elevation={3}>
        <div className={classes.header}>History</div>
        <Divider />
        <List className={classes.root}>
          {joinIndexed(
            history.map((h) => (i: number) => listItem(h, i === 0)),
            (i) => (
              <Divider key={i} />
            )
          )}
        </List>
      </Paper>
    </Box>
  );
}
