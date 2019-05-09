import React, { Component } from 'react';
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Link
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
  }
})
console.log(theme)

//assets
import './Assets/css/main.css'
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme = {theme}>
      <Router>
          <Header />
            <Route exact path='/'component = {About} />
            <Route exact path='/team'component = {Team} />
            <Route exact path='/shop'component = {Shop} />
            <Route exact path='/offer'component = {Offer} />
            <Route exact path='/cart' component = {Cart} />
            <Route exact path='/orderhistory' component = {OrderHistory} />
            <Route exact path='/reservation' component = {Reservation} />
          <Footer />
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
