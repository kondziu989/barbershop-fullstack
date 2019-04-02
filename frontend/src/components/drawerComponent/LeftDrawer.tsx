import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider, Button, Drawer, withStyles, WithStyles, IconButton } from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LoginIcon from '@material-ui/icons/Done';
import LogoutIcon from '@material-ui/icons/Close'
import RegisterIcon from '@material-ui/icons/AlternateEmail'

import LoginDialog from "../loginComponent/LoginDialog";
import MenuIcon from '@material-ui/icons/Menu'



const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };


  interface DrawerProps extends WithStyles<typeof styles>{
  }

class TemporaryDrawer extends React.Component<DrawerProps> {
    state = {
      left: false,
    };
  
    toggleDrawer = (open: any) => () => {
      this.setState({
        left: open,
      });
    };
  
    render() {
      const { classes } = this.props;
  
      const sideList = (
        <div className={classes.list}>
          <List>
              <ListItem button key='login'>
                <ListItemIcon><LoginIcon/></ListItemIcon>
                <ListItemText primary='Zaloguj się'></ListItemText>
              </ListItem>
              <ListItem button key='logout'>
                <ListItemIcon><LogoutIcon/></ListItemIcon>
                <ListItemText primary="Wyloguj się"></ListItemText>
              </ListItem>
              <ListItem button key='register'>
                <ListItemIcon><RegisterIcon/></ListItemIcon>
                <ListItemText primary="Załóż konto"></ListItemText>
              </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );
  
      return (
        <div>
            <IconButton onClick={this.toggleDrawer(true)}><MenuIcon></MenuIcon></IconButton>
          {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
          <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              {sideList}
            </div>
          </Drawer>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(TemporaryDrawer);