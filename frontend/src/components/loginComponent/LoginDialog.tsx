import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import {handleLogin, UserCredencials} from '../../actions/loginAction';
import { connect } from 'react-redux'; 

interface UserData {
  firstName: String,
  token: String,
  tokenExpiration: 1
}

interface LoginDialogProps{
  submitLogin: Function,
  userData: UserData
}

interface LoginDialogState{
  open: boolean,
  email: String,
  password: String
}

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {

     readonly state : LoginDialogState = {
        open: false,
        email:"",
        password:""
      };
    

    handleClickOpen = () => {
      this.setState({open: true });
    };
  
    handleClose = () => {
      this.setState({open: false });
    };

    handleEmailChange = (event: any) =>{
      this.setState({email:event.target.value})
      console.log(this.state)
    }

    handlePasswordChange = (event: any) =>{
      this.setState({password: event.target.value})
      console.log(this.state)
    }

    handleLogin = () => {
      const {email, password} = this.state;
      this.props.submitLogin({email, password});
    }
    render() {
      console.log(this.props.userData)
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
      userData: state.userData
    }
  }

  const mapDispatchToProps = (dispatch: any) => {
    return {
      submitLogin: (userCredencials : UserCredencials) => dispatch(handleLogin(userCredencials))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);