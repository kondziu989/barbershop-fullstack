import React, { Component } from 'react';

import '../../Assets/css/about/about.css'
import image from '../../photos/salon1.jpg'
//components


class Footer extends Component {
  render() {
    return (
        <div className='container-fluid content'>
        <div id = "slider">
            <div id = "saloon"><img src = {image}></img></div>
            <a className="prev">&#10094;</a>
            <a className="next">&#10095;</a>
            <div className = "dots">
                    <span className="dot"></span> 
                    <span className="dot"></span> 
                    <span className="dot"></span> 
                    <span className="dot"></span> 
                    
            </div>
        </div>
        


        <div id="info">
                <h4>DANE KONTAKTOWE</h4>
                <p>Mohawk Barbershop</p>
                <p>Juranda 13</p>
                <p>44-100 Wrocław</p>
                <p>mohawkBarbershop.pl</p>
                <p>mohawkbarbershop@gmail.com</p>
                <p>+48 123 456 789</p>
                <p>+48 987 654 312</p>
                <h4>GODZINY OTWARCIA</h4>
                <table>
                    <tr>
                        <td>PN</td>
                        <td>08:00 - 22:00</td>
                    </tr>
                    <tr>
                        <td>WT</td>
                        <td>08:00 - 20:00</td>
                    </tr>
                    <tr>
                        <td>ŚR</td>
                        <td>08:00 - 20:00</td>
                    </tr>
                    <tr>
                        <td>CZ</td>
                        <td>08:00 - 21:00</td>
                    </tr>
                    <tr>
                        <td>PT</td>
                        <td>08:00 - 21:00</td>
                    </tr>
                    <tr>
                        <td>SB</td>
                        <td>08:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>ND</td>
                        <td>ZAMKNIĘTE</td>
                    </tr>
                </table>
            </div>
                <article id="description">
                    <h2>O salonie</h2>
                    <p>
                        Z pasji do fryzjerstwa powstał Mohawk`s Barbershop, nabardziej męski salon w mieście. Pracuję na najlepszych na rynku kosmetykach przeznaczonych właśnie dla mężczyzn. Wyróżnia mnie pro aktywne nastawienie do klienta oraz nowatorskie podejście do sztuki jaką jest fryzjerstwo. Zamiłowanie do zawodu i chęć doskonalenia swoich umiejętności pozwoliły na stworzenie szerokiej gamy usług przeznaczonych dla najbardziej wymagających mężczyzn, począwszy od strzyżenia przez koloryzację, a skończywszy na kompletnej pielęgnacji włosów. Świadczę usługi na najwyższym poziomie… na takim , na jakim sam chciałbym być obsługiwany.
                    </p>
                </article>
    </div>
    );
  }
}

export default Footer;
