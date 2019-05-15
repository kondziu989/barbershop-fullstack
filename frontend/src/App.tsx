import React, { Component } from 'react';
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'



//components
import Header from './components/headerComponent/Header'
import Footer from './components/footerComponent/Footer'
//pages
import Offer from './components/pages/Offer'
import Shop from './components/pages/Shop'
import Team from './components/pages/Team'
import About from './components/pages/About'
import Cart from './components/pages/Cart'
import OrderHistory from './components/pages/OrderHistory'
import Reservation from './components/pages/Reservation'
import Auth from './components/pages/Auth'
import Reservations from './components/pages/Reservations'


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import { amber, grey } from '@material-ui/core/colors'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';

let theme = createMuiTheme({
  palette:{
    primary: amber,
    secondary: grey,
    type: 'dark'
  },

  typography: {
    useNextVariants: true,
  },
})
console.log(theme)

interface AppProps{
  token: string,
}
//assets
import './Assets/css/main.css'
import { connect } from 'react-redux';
import { openRegisterDialog, closeRegisterDialog } from './actions/registerAction';
import { openLoginDialog } from './actions/loginAction';
class App extends Component<AppProps> {

  PrivateRoute = ({ component: Component, ...rest }:any) => {
    
    return (
      <Route
        {...rest}
        render={props =>
          typeof this.props.token==='undefined'||this.props.token.length<=0 ?(
            // <Redirect
            //   to={{
            //     pathname: "/",
            //     state: { from: props.location }
            //   }}
            // />
            <Auth />
          ):(
            <Component {...props} />
          )
        }
      />
    );
  }
  render() {
    return (
      <MuiThemeProvider theme = {theme}>
      <Router>
          <Header />
            <Route exact path='/'component = {About}/>
              <Route exact path='/team'component = {Team} />
              <Route exact path='/shop'component = {Shop} />
              <Route exact path='/offer'component = {Offer} />
              <this.PrivateRoute exact path='/orderhistory' component = {OrderHistory} />
              <this.PrivateRoute exact path='/reservation' component = {Reservation} />
              <this.PrivateRoute exact path='/cart' component = {Cart} />
              <this.PrivateRoute exact path='/reservations' component = {Reservations} />
          <Footer />
      </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token: state.login.userData.token,
  };
};

export default connect(mapStateToProps)(App);
