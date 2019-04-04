import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, InputAdornment, IconButton, FormControl, SnackbarContent } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class RegisterDialog extends React.Component {
  readonly EMAIL = 1;
  readonly PASSWORD = 2;
  readonly FIRST = 3;
  readonly LAST = 4;
  readonly PHONE = 5;


    state = {
      open: false,
      email:"",
      password:"",
      firstname:"",
      lastname:"",
      phone:"",
      error_message: "",
      showError:false,
      errorCode:Array<number>()
    };
    
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    handleAccept = () => {

      if(this.validateInput()){
      }
      else


      console.log(this.state);
    }
    validateInput = () => {
      this.clearErrorCode()
      if(!this.validateEmail())
        return false
      if(!this.validatePassword())
        return false
      if(!this.validateRequired())
        return false
    }

    clearErrorCode = () => {
      this.setState({errorCode:Array<number>()});
    }

    validateEmail = () => {
      let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (regexp.test(String(this.state.email).toLowerCase())){
        return true
      }
      this.setState({error_message: "E-mail w złym formacie!"})
      this.setState({errorCode: this.state.errorCode.concat(this.EMAIL)})
        return false
    }

    validatePassword = () => {
      if(this.state.password.length > 5)
      return true
      
      console.log("KROTKIE HASLO")
      this.setState({error_message: "Hasło zbyt krótkie!"});
      this.setState({errorCode: this.state.errorCode.concat(this.PASSWORD)})
      return false
    }

    validateRequired = () => {
      return true
    }
    
    handleEmailChange = (event: any) =>{
      this.setState({email:event.target.value})
      console.log(this.state)
    }

    handlePasswordChange = (event: any) =>{
      this.setState({password: event.target.value})
      console.log(this.state)
    }

    handleFirstNameChange = (event: any) =>{
      this.setState({firstname: event.target.value})
      console.log(this.state)
    }

    handleLastNameChange = (event: any) =>{
      this.setState({lastname: event.target.value})
      console.log(this.state)
    }

    handlePhoneChange = (event: any) =>{
      this.setState({phone: event.target.value})
      console.log(this.state)
    }
  
    render() {
      return (
        <>
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
                required
                autoFocus
                error={this.state.errorCode.includes(this.EMAIL)?true:false}
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                onChange={this.handleEmailChange}
                helperText={this.state.errorCode.includes(this.EMAIL)?this.state.error_message:false}
              />
              <TextField
                required
                error={this.state.errorCode.includes(this.PASSWORD)?true:false}
                margin="dense"
                id="password"
                label="Hasło"
                type="password"
                fullWidth
                onChange={this.handlePasswordChange}
                helperText={this.state.errorCode.includes(this.PASSWORD)?this.state.error_message:false}

              />
              <TextField
                required
                error={this.state.errorCode.includes(this.FIRST)?true:false}
                margin="dense"
                id="name"
                label="Imię"
                type="name"
                fullWidth
                onChange={this.handleFirstNameChange}
              />
              <TextField
                required
                error={this.state.errorCode.includes(this.LAST)?true:false}
                margin="dense"
                id="last-name"
                label="Nazwisko"
                type="last-name"
                fullWidth
                onChange={this.handleLastNameChange}
              />
              <TextField
                required
                error={this.state.errorCode.includes(this.PHONE)?true:false}
                margin="dense"
                id="phone"
                label="Telefon"
                type="phone"
                fullWidth
                onChange={this.handlePhoneChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Anuluj
              </Button>
              <Button onClick={this.handleAccept} color="primary">
                Zatwierdź
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }