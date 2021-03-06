import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import logo from './logo.png'
import { AppBar, Grid } from '@material-ui/core';
import RegisterDialog from '../registerComponent/registerDialog'
import LoginDialog from '../loginComponent/LoginDialog';
import LeftDrawer from '../drawerComponent/LeftDrawer';
class Header extends Component{
    render(){
        return(
            // <Grid container alignItems="center"2 justify="center">
            //     <Grid container alignItems="center" justify="center" item xs={10}>
            //         <Grid item xs={6} sm={3}>
            //             <Link to="/offer">Oferta</Link>
            //         </Grid>
            //         <Grid item xs={6} sm={3}>
            //             <Link to="/shop">Produkty</Link>
            //         </Grid>
            //         <Grid item xs={6}  sm={3}>
            //             <Link to="/">O nas</Link>
            //         </Grid>
            //         <Grid item xs={6}  sm={3}>
            //             <Link to="/team">Zespół</Link>
            //         </Grid>
            //     </Grid>
            // </Grid>
            <header>
            <div className="wrap">
                <div className = "logo">
                    <img src={logo} alt='' width='100px'></img>
                    <div className="logoTitle"><span className="primary-font">Mohawk </span>Barbershop</div>
                    <RegisterDialog></RegisterDialog>
                    <LoginDialog></LoginDialog>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/offer">Oferta</Link>
                    </li>
                    <li>
                        <Link to="/shop">Produkty</Link>
                    </li>
                    <li>
                        <Link to="/">O nas</Link>
                    </li>
                    <li>
                        <Link to="/team">Zespół</Link>
                    </li>
                    <li>
                        <LeftDrawer></LeftDrawer>
                    </li>
                </ul>
            </nav> 
            <Grid container>    
                </Grid>
            </header>
        );
    }
}

export default Header;