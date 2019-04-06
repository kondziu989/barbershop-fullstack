import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import {handleLogin, UserCredencials, openLoginDialog, closeLoginDialog} from '../../actions/loginAction';
import { connect } from 'react-redux'; 

interface UserData {
  firstName: String,
  token: String,
  tokenExpiration: 1
}

interface LoginDialogProps{
  openDialog: Function,
  closeDialog: Function,
  submitLogin: Function,
  userData: UserData,
  isOpen: boolean
}

interface LoginDialogState{
  email: String,
  password: String
}

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {

     readonly state : LoginDialogState = {
        email:"",
        password:""
      };
    

    handleOpen = () => {
      this.props.openDialog()
    };
  
    handleClose = () => {
      this.props.closeDialog()
    };

    handleEmailChange = (event: any) => {
      this.setState({email:event.target.value})
    }

    handlePasswordChange = (event: any) => {
      this.setState({password: event.target.value})
    }

    handleLogin = () => {
      const {email, password} = this.state;
      if(email.length > 0 && password.length > 0){
        this.props.submitLogin({email, password});
      }
    }
    render() {
      return (
        <>
          <Button variant="outlined" color="primary" onClick={this.handleOpen}>
            Zaloguj się
          </Button>
          <Dialog
            open={this.props.isOpen}
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
              <Button onClick={this.handleLogin} color="primary">
                Zaloguj
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }
  const mapStateToProps = (state : any) => {
    return{
      isOpen: state.login.isOpen,
      userData: state.login.userData
    }
  }

  const mapDispatchToProps = (dispatch: any) => {
    return {
      openDialog: () => dispatch(openLoginDialog()),
      closeDialog: () => dispatch(closeLoginDialog()),
      submitLogin: (userCredencials : UserCredencials) => dispatch(handleLogin(userCredencials))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);