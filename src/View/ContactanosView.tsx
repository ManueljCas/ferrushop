import React from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Contactanos.css';
import ContactanosIMG from '../IMG/Group 124.png';
import TresColoresIMG from '../IMG/Trescolores.png';
import Azul from '../IMG/Azul.png';
import Amarillo from '../IMG/Amarillo.png';
import Rosa from '../IMG/Rosa.png';
import Verde from '../IMG/Verde.png';

function Contacto() {
  return (
    <div>
      <Header />
      <div className='contact-page'>
        <div className='info-contact-container'>
          <div className='information-about-us'>
            <h1>Information About us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.</p>
            <img src={TresColoresIMG} alt="Tres Colores" className='tres-colores' />
          </div>

          <div className='contact-methods'>
            <h1>Medios de contacto</h1>
            <p><img src={Azul} alt="Teléfono" /> Tel: 877-67-88-99</p>
            <p><img src={Rosa} alt="Email" /> E-Mail: shop@store.com</p>
            <p><img src={Verde} alt="Horario" /> Horario de soporte: 8:00 AM - 10:00 PM</p>
            <p><img src={Amarillo} alt="Dirección" /> 20 Margaret st, London, Great britain, 3NM98-LK</p>
            <p><img src={Azul} alt="Entrega gratis" /> Entrega gratis en todos los pedidos</p>
          </div>
        </div>

        <div className='get-in-touch'>
          <h1>Get In Touch</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices tristique amet erat vitae eget dolor lobortis quis bibendum quam.</p>
          <form className='form-contact'>
            <div className='form-group'>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
              <input type="email" id="email" name="email" placeholder="Your E-mail" required />
            </div>
            <input type="text" id="subject" name="subject" placeholder="Subject" required />
            <textarea id="message" name="message" placeholder="Type Your Message" required></textarea>
            <button type="submit">Send Mail</button>
          </form>
        </div>

        <div className='Contactanos'>
          <img className="Contactanos-img" src={ContactanosIMG} alt="Contactanos" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contacto;