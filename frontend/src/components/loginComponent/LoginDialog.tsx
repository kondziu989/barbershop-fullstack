import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
class LoginDialog extends React.Component {
    state = {
      open: false,
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      return (
        <>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Zaloguj się
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Logowanie</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Wprowadź dane logowania
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                margin="dense"
                id="password"
                label="Hasło"
                type="password"
                fullWidth
              />
            
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Anuluj
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Zaloguj
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }

export default LoginDialog;