import React, { useState, useEffect } from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Contactanos.css';
import TresColoresIMG from '../IMG/Trescolores.png';
import Azul from '../IMG/Azul.png';
import Amarillo from '../IMG/Amarillo.png';
import Rosa from '../IMG/Rosa.png';
import Verde from '../IMG/Verde.png';

function Contacto() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula una carga inicial
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="producto-loading-screen">
        <div className="producto-loading-spinner"></div>
        <p className="producto-loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='contact-page'>
        <div className='info-contact-container'>
          <div className='information-about-us'>
            <h1>Información Sobre Nosotros</h1>
            <p>Ferrushop es tu ferretería de confianza en Cancún. Nos dedicamos a ofrecer una amplia gama de productos de alta calidad para tus necesidades de construcción y mejoras del hogar. Nuestro compromiso es brindar el mejor servicio al cliente con precios competitivos y entrega rápida.</p>
            <img src={TresColoresIMG} alt="Tres Colores" className='tres-colores' />
          </div>

          <div className='contact-methods'>
            <h1>Medios de Contacto</h1>

            <div className='textoconimagen'>
              <img src={Azul} alt="Teléfono" /> <p>Tel: 998-123-4567</p>
            </div>

            <div className='textoconimagen'>
              <img src={Rosa} alt="Email" /> 
              <p>E-Mail: contacto@ferrushop.com</p>
            </div>

            <div className='textoconimagen'>
              <img src={Verde} alt="Horario" />
              <p>Horario de Soporte: 8:00 AM - 10:00 PM</p>
            </div>

            <div className='textoconimagen'>
              <img src={Amarillo} alt="Dirección" />
              <p>Av. Tulum 123, Cancún, Quintana Roo, México</p>
            </div>

            <div className='textoconimagen'>
              <img src={Azul} alt="Entrega gratis" />
              <p>Entrega gratis en todos los pedidos</p>
            </div>
          </div>
        </div>

       
      </div>
      <Footer />
    </div>
  );
}

export default Contacto;
