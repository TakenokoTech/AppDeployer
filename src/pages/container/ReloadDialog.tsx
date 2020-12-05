/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */

import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

interface DialogProps {
  openDialog: boolean;
}

export default class ReloadDialog extends React.Component<DialogProps> {
  handleClose = (): void => {
    location.reload(true);
  };

  render() {
    return (
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
