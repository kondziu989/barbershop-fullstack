import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputAdornment,
  IconButton,
  FormControl,
  SnackbarContent,
  LinearProgress
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { reject } from "q";

//redux
import {
  openRegisterDialog,
  closeRegisterDialog
} from "../../actions/registerAction";
import { openLoginDialog } from "../../actions/loginAction";
import { connect } from "react-redux";

interface Error {
  index: number;
  message: string;
}

interface NewUser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
}

enum Status {
  none,
  pending,
  accepted,
  rejected
}

const query = (data: NewUser) => {
  return JSON.stringify({
    query: `mutation {
      register(userInput: {
        email: "${data.email}",
        password: "${data.password}",
        firstName: "${data.firstname}",
        lastName: "${data.lastname}",
        phone: "${data.phone}"
      })
    }
    `
  });
};

interface RegisterDialogProps {
  isOpen: boolean;
  openDialog: Function;
  closeDialog: Function;
  openLogin: Function;
  userData: any;
}

interface RegisterDialogState {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  errors: Array<Error>;
  responseStatus: any;
  status: Status;
}

class RegisterDialog extends React.Component<
  RegisterDialogProps,
  RegisterDialogState
> {
  readonly EMAIL = 1;
  readonly PASSWORD = 2;
  readonly FIRST = 3;
  readonly LAST = 4;
  readonly PHONE = 5;
  readonly EMPTY_MESSAGE = "To pole nie może być puste";

  readonly state: RegisterDialogState = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    errors: Array<Error>(),
    responseStatus: null,
    status: Status.none
  };

  fetchNewUser = () => {
    const userData: NewUser = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone
    };
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: query(userData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        this.setState({
          status: Status.accepted,
          responseStatus: data.data.register
        });
      })
      .catch(data => this.setState({ status: Status.rejected }));
  };

  handleClickOpen = () => {
    this.props.openDialog();
  };

  handleClose = () => {
    this.setState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      errors: Array<Error>(),
      responseStatus: null,
      status: Status.none
    });
    this.props.closeDialog();
  };

  handleOpenLogin = () => {
    this.setState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      errors: Array<Error>(),
      responseStatus: null,
      status: Status.none
    });
    this.props.openLogin();
  };

  handleAccept = () => {
    this.validateInput();
  };
  validateInput = () => {
    const errors: Array<Error> = [];
    this.validateEmail(errors);
    this.validatePassword(errors);
    this.validateFirstName(errors);
    this.validateLastName(errors);
    this.validatePhone(errors);
    this.setState({ errors: errors });

    if (errors.length === 0) {
      this.setState({ status: Status.pending });
      this.fetchNewUser();
    }
  };

  validateEmail = (errors: Array<Error>) => {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regexp.test(String(this.state.email).toLowerCase())) {
      return true;
    }
    errors.push({
      index: this.EMAIL,
      message: "E-mail w złym formacie"
    });
    return false;
  };

  validatePassword = (errors: Array<Error>) => {
    if (this.state.password.length > 5) return true;

    errors.push({
      index: this.PASSWORD,
      message: "Hasło zbyt krótkie"
    });
    return false;
  };

  validateFirstName = (errors: Array<Error>) => {
    if (this.state.firstname.length === 0) {
      errors.push({
        index: this.FIRST,
        message: this.EMPTY_MESSAGE
      });
      return false;
    }
    return true;
  };
  validateLastName = (errors: Array<Error>) => {
    if (this.state.lastname.length === 0) {
      errors.push({
        index: this.LAST,
        message: this.EMPTY_MESSAGE
      });
      return false;
    }
    return true;
  };
  validatePhone = (errors: Array<Error>) => {
    if (this.state.phone.length === 0) {
      errors.push({
        index: this.PHONE,
        message: this.EMPTY_MESSAGE
      });
      return false;
    }
    return true;
  };

  getErrorMessage = (index: number) => {
    let err = this.state.errors.filter(err => err.index === index);
    return err.length === 0 ? false : err[0].message;
  };

  handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleFirstNameChange = (event: any) => {
    this.setState({ firstname: event.target.value });
  };

  handleLastNameChange = (event: any) => {
    this.setState({ lastname: event.target.value });
  };

  handlePhoneChange = (event: any) => {
    this.setState({ phone: event.target.value });
  };

  showLinearQuery = () => {
    return this.state.status === Status.pending ? (
      <LinearProgress color="primary" variant="query" />
    ) : null;
  };

  displayContent = () => {
    const { status, responseStatus, errors } = this.state;
    if (status === Status.accepted && responseStatus) {
      return (
        <>
          <DialogContent>
            <DialogContentText>
              Dziękujemy za założenie konta w naszym serwisie!
            </DialogContentText>
            <DialogActions>
              <Button color="primary" onClick={this.handleClose}>
                Anuluj
              </Button>
              <Button color="primary" onClick={this.handleOpenLogin}>
                Zaloguj
              </Button>
            </DialogActions>
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogContent>
            <DialogContentText>
              {status !== Status.rejected && responseStatus === null
                ? "Załóż konto w naszym serwisie aby uzyskać dostęp do dodatkowych opcji!"
                : "Przepraszamy, wystapił błąd podczas rejestracji. Prosimy spróbować ponownie."}
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={this.handleEmailChange}
              error={errors
                .map(err => (err.index === this.EMAIL ? true : false))
                .includes(true)}
              helperText={this.getErrorMessage(this.EMAIL)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label="Hasło"
              type="password"
              fullWidth
              onChange={this.handlePasswordChange}
              error={errors
                .map(err => (err.index === this.PASSWORD ? true : false))
                .includes(true)}
              helperText={this.getErrorMessage(this.PASSWORD)}
            />
            <TextField
              required
              margin="dense"
              id="first-name"
              label="Imię"
              type="name"
              fullWidth
              onChange={this.handleFirstNameChange}
              error={errors
                .map(err => (err.index === this.FIRST ? true : false))
                .includes(true)}
              helperText={this.getErrorMessage(this.FIRST)}
            />
            <TextField
              required
              margin="dense"
              id="last-name"
              label="Nazwisko"
              type="last-name"
              fullWidth
              onChange={this.handleLastNameChange}
              error={errors
                .map(err => (err.index === this.LAST ? true : false))
                .includes(true)}
              helperText={this.getErrorMessage(this.LAST)}
            />
            <TextField
              required
              margin="dense"
              id="phone"
              label="Telefon"
              type="phone"
              fullWidth
              onChange={this.handlePhoneChange}
              error={errors
                .map(err => (err.index === this.PHONE ? true : false))
                .includes(true)}
              helperText={this.getErrorMessage(this.PHONE)}
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
        </>
      );
    }
  };

  //TODO add display success msg and fail msg
  render() {
    const {userData} = this.props;
    return (
      (userData.firstName)?
      <p style={{display: "inline-block", color: "white", marginRight: "20px"}}>{`Witaj, ${userData.firstName} ! `}</p>
      :
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Zarejestruj się
        </Button>
        <Dialog
          open={this.props.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Rejestracja</DialogTitle>
          {this.displayContent()}
          {this.showLinearQuery()}
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isOpen: state.register.isOpen,
    userData: state.login.userData
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openDialog: () => dispatch(openRegisterDialog()),
    closeDialog: () => dispatch(closeRegisterDialog()),
    openLogin: () => {
      dispatch(closeRegisterDialog());
      dispatch(openLoginDialog());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterDialog);
