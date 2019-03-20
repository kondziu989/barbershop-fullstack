import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import logo from './logo.png'


class Header extends Component{
    render(){
        return(
            <header>
            <div className="wrap">
                <div className = "logo">
                    <img src={logo} alt='' width='100px'></img>
                    <div className="logoTitle"><span className="primary-font">Mohawk </span>Barbershop</div>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="#">Oferta</Link>
                    </li>
                    <li>
                        <Link to="#">Produkty</Link>
                    </li>
                    <li>
                        <Link to="/">O nas</Link>
                    </li>
                    <li>
                        <Link to="#">Zespół</Link>
                    </li>
                </ul>
            </nav>        
            
            </header>
        );
    }
}

export default Header;