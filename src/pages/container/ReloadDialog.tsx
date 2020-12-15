/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */

import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, WithStyles, withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

const styles = () => ({
  progresBase: {
    position: "fixed" as const,
    height: "100%",
    width: "100%",
    top: "0px",
    left: "0px",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  progresCenter: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
  },
});

interface DialogProps extends WithStyles<typeof styles> {
  classes: any;
  isLoading: boolean;
  openDialog: boolean;
}

class ReloadDialog extends React.Component<DialogProps> {
  handleClose = (): void => {
    location.reload(true);
  };

  render() {
    const { classes } = this.props;
    return this.props.isLoading ? (
      <div className={classes.progresBase}>
        <div className={classes.progresCenter}>
          <CircularProgress color="primary" />
        </div>
      </div>
    ) : (
      <Dialog open={this.props.openDialog} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">トークンが切れました</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">アクセストークンの有効期限が切れたようです。 リロードしてください。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            確認
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ReloadDialog);
