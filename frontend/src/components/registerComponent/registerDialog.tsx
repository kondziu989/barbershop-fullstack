import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";

export default class RegisterDialog extends React.Component {
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
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Zarejestruj się
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Rejestracja</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Załóż konto w naszym serwisie aby uzyskać dostęp do dodatkowych opcji!
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
                id="name"
                label="Imię"
                type="name"
                fullWidth
              />
              <TextField
                margin="dense"
                id="last-name"
                label="Nazwisko"
                type="last-name"
                fullWidth
              />
              <TextField
                margin="dense"
                id="phone"
                label="Telefon"
                type="phone"
                fullWidth
              />
            
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Anuluj
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Zatwierdź
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }