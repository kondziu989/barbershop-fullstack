import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { openRegisterDialog } from "../../actions/registerAction";
import { openLoginDialog } from "../../actions/loginAction";

//components
const styles = (theme: Theme) =>
  createStyles({
    
  });

interface AuthProps extends WithStyles<typeof styles> {
  openRegisterDialog: Function;
  openLoginDialog: Function;
}
const Auth = withStyles(styles)(
  class extends Component<AuthProps, {}> {

  
    componentDidMount() {

    }

    handleLogin = () =>{
        this.props.openLoginDialog();
    }
    handleRegister = () => {
        this.props.openRegisterDialog();
    }

    render() {
      return (
          
        <Grid container justify="center">
          <Grid className="content" justify="center" item xs={9}>
          <Typography inline>
                Aby zobaczyć tą zawartość należy się zalogować 
            </Typography>
            <Button color='primary' onClick={() => this.handleLogin()}>TUTAJ</Button>
            <Typography/>
            <Typography inline>
                Nie masz konta?
            </Typography>
            <Button color='primary' style={{display: 'inline-block'}} onClick={() => this.handleRegister()}>ZAREJESTRUJ SIĘ</Button>
          </Grid>
        </Grid>
      );
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    // services: state.services.services,
    
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openRegisterDialog: () => dispatch(openRegisterDialog()),
    openLoginDialog:() => dispatch(openLoginDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
