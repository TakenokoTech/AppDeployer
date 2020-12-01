/* eslint-disable comma-dangle */
/* eslint-disable max-len */
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Schedule from "@material-ui/icons/Schedule";
import React from "react";
import { AppInfo, HistoryItem } from "../../components/DataSource";
import { joinIndexed } from "../../components/Util";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "0px",
  },
  scroll: {
    overflow: "hidden",
    overflowY: "scroll",
    height: "600px",
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
  itemText: {
    wordBreak: "break-all",
  },
  branchText: {
    fontSize: "1em",
    padding: "0px 0px",
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  commentText: {
    fontSize: "0.9em",
    padding: "8px 0px",
    color: "#444",
  },
  deteText: {
    fontSize: "0.9em",
    color: "#444",
    padding: "8px 0px",
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

interface HistoryProps {
  appInfo: AppInfo;
  changeItem: (commit: string) => void;
}

export default function History(props: HistoryProps): JSX.Element {
  const classes = useStyles();

  const { appInfo } = props;
  const history = appInfo?.history || [];

  const listItem = (item: HistoryItem, isSelected: boolean) => (
    <ButtonBase focusRipple className={classes.button} key={item.date} onClick={() => props.changeItem(item.commit)}>
      <ListItem className={isSelected ? classes.itemBaseSelected : classes.itemBase}>
        <div className={isSelected ? classes.itemBaseSelectedBar : classes.itemBase} />
        <div className={classes.itemText}>
          <div className={classes.deteText}>
            {item.date} [{item.commit.substring(0, 6)}]
          </div>
          <div className={classes.branchText}>{item.branch}</div>
          <div className={classes.commentText}>{item.comment}</div>
        </div>
      </ListItem>
    </ButtonBase>
  );

  return (
    <Box p={0} my={3}>
      <Paper elevation={3}>
        <div className={classes.header}>History</div>
        <Divider />
        <div className={classes.scroll}>
          <List className={classes.root}>
            {joinIndexed(
              history.map((h) => (i: number) => listItem(h, h.commit === appInfo.text.commit)),
              (i) => (
                <Divider key={i} />
              )
            )}
          </List>
        </div>
      </Paper>
    </Box>
  );
}
