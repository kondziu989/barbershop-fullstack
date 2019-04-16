import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Drawer,
  withStyles,
  WithStyles,
  IconButton
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import LoginIcon from "@material-ui/icons/Done";
import LogoutIcon from "@material-ui/icons/Close";
import RegisterIcon from "@material-ui/icons/AlternateEmail";

import LoginDialog from "../loginComponent/LoginDialog";
import MenuIcon from "@material-ui/icons/Menu";

//redux
import { connect } from "react-redux";
import { openLoginDialog } from "../../actions/loginAction";
import { openRegisterDialog } from "../../actions/registerAction";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  icon: {
    color: "white"
  }
};

interface DrawerProps extends WithStyles<typeof styles> {
  openLoginDialog: Function;
  openRegisterDialog: Function;
}

class TemporaryDrawer extends React.Component<DrawerProps, {}> {
  state = {
    right: false
  };

  toggleDrawer = (open: any) => () => {
    this.setState({
      right: open
    });
  };

  openLoginDialog = () => {
    this.props.openLoginDialog();
  };

  openRegisterDialog = () => {
    this.props.openRegisterDialog();
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key="login" onClick={this.openLoginDialog}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Zaloguj się" />
          </ListItem>
          <ListItem button key="logout">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Wyloguj się" />
          </ListItem>
          <ListItem button key="register" onClick={this.openRegisterDialog}>
            <ListItemIcon>
              <RegisterIcon />
            </ListItemIcon>
            <ListItemText primary="Załóż konto" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Rezerwacje", "Zamówienia", "Moje konto"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <>
        <MenuIcon className={classes.icon} onClick={this.toggleDrawer(true)} />
        {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    openLoginDialog: () => dispatch(openLoginDialog()),
    openRegisterDialog: () => dispatch(openRegisterDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TemporaryDrawer));
