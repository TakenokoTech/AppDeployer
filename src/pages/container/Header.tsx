/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
import { InputBase, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Select from "@material-ui/core/Select/Select";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { AppInfo } from "../../components/DataSource";
import { RepoItem } from "../../components/GithubRepository";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: `linear-gradient(60deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface HeaderProps {
  appInfo: AppInfo;
  repos: RepoItem[];
  changeRepo: (repo: string) => void;
}

export default function Header(props: HeaderProps): JSX.Element {
  const classes = useStyles();
  const { appInfo, repos } = props || {};

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Apricot
        </Typography>
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div> */}
        <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" value={appInfo?.appName} onChange={(e) => props.changeRepo(`${e.target.value}`)}>
          {repos?.map((it, i) => (
            <MenuItem key={i} value={it.name}>
              {it.full_name}
            </MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  );
}
