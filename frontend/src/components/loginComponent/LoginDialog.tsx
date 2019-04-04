import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";


interface loginData{
  email:String,
  password:String
}
class LoginDialog extends React.Component {
    state = {
      open: false,
      email:"",
      password:""
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    handleEmailChange = (event: any) =>{
      this.setState({email:event.target.value})
      console.log(this.state)
    }

    handlePasswordChange = (event: any) =>{
      this.setState({password: event.target.value})
      console.log(this.state)
    }
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
                onChange={this.handleEmailChange}
              />
              <TextField
                margin="dense"
                id="password"
                label="Hasło"
                type="password"
                fullWidth
                onChange={this.handlePasswordChange}
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