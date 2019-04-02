import React, { Component } from 'react';
import './App.css';
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//redux
import store from './components/store'
import { Provider } from 'react-redux';

//components
import Header from './components/headerComponent/Header'
import Footer from './components/footerComponent/Footer'

import Offer from './components/pages/Offer'
import Shop from './components/pages/Shop'
import Team from './components/pages/Team'
import About from './components/pages/About'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { amber, grey } from '@material-ui/core/colors'


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
      <Provider store={store}>
      <MuiThemeProvider theme = {theme}>
      <Router>
          <Header />
            <Route exact path='/'component = {About} />
            <Route exact path='/team'component = {Team} />
            <Route exact path='/shop'component = {Shop} />
            <Route exact path='/offer'component = {Offer} />
          <Footer />
      </Router>
      </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
