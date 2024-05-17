import React from 'react';
import '../Css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Ferrushop</h2>
          <p>Tu tienda de confianza para los mejores productos.</p>
        </div>
        <div className="footer-section links">
          <h2>Enlaces Útiles</h2>
          <ul>
            <li><a href="/inicio">Inicio</a></li>
            <li><a href="/acerca">Productos</a></li>
            <li><a href="/servicios">Nosotros</a></li>
            <li><a href="/productos">FAQ</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contacto</h2>
          <p>Email: info@ferrushop.com</p>
          <p>Teléfono: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ferrushop. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
