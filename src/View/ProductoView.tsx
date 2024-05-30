import React from 'react';
import '../Css/Producto.css';
import Header from './HeaderView';
import Footer from './FooterView';
import ProductoImage from '../IMG/Producto.png';
import Grid from '@material-ui/core/Grid';

function Producto() {
  return (
    <div>
      <Header />

      <div className='contenedor-seccion-productos'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} className='filtro-precio'>
            <h2>Filtrar Precio</h2>
            <ul>
              <li>
                <input type="checkbox" id="precio1" name="precio1" value="0-50" />
                <label htmlFor="precio1">$0.00 - $50.00</label>
              </li>
              <li>
                <input type="checkbox" id="precio2" name="precio2" value="50-100" />
                <label htmlFor="precio2">$50.00 - $100.00</label>
              </li>
              <li>
                <input type="checkbox" id="precio3" name="precio3" value="100-150" />
                <label htmlFor="precio3">$100.00 - $150.00</label>
              </li>
              <li>
                <input type="checkbox" id="precio4" name="precio4" value="150-200" />
                <label htmlFor="precio4">$150.00 - $200.00</label>
              </li>
            </ul>
            <button>Aplicar</button>
          </Grid>

          <Grid item xs={12} md={9} className='lista-productos'>
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <Grid item xs={12} key={index}>
                  <div className='producto-item'>
                    <img src={ProductoImage} alt={`Producto ${item}`} className='producto-imagen' />
                    <div className='producto-info'>
                      <h3>Martillo</h3>
                      <p>$26.00</p>
                      <p>Martillo de madera, especial para obra y hogar, haciendo de esto una excelente opción para su uso diario.</p>
                      <div className="producto-iconos">
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
}

export default Producto;
