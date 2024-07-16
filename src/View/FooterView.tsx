import React from 'react';
import '../Css/Footer.css';
import Grid from '@material-ui/core/Grid';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <div className="footer-section about">
              <h2>Ferrushop</h2>
              <p>Tu tienda de confianza para los mejores productos.</p>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="footer-section links">
              <h2>Enlaces Útiles</h2>
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/producto">Productos</a></li>
                <li><a href="/nosotros">Nosotros</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/contacto">Contacto</a></li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="footer-section contact">
              <h2>Contacto</h2>
              <p>Email: info@ferrushop.com</p>
              <p>Teléfono: +52 999 888 7777</p>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ferrushop. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
