import React from 'react';
import '../Css/Producto.css';
import Header from './HeaderView';
import Footer from './FooterView';
import ProductoImage from '../IMG/Producto.png'; // Asegúrate de que la ruta sea correcta

function Producto() {
  return (
    <div>
      <Header/>

      <div className='contenedor-seccion-productos'>
        <aside className='filtro-precio'>
          <h2>Filtrar Precio</h2>
          <ul>
            <li>
              <input type="checkbox" id="precio1" name="precio1" value="0-50"/>
              <label htmlFor="precio1">$0.00 - $50.00</label>
            </li>
            <li>
              <input type="checkbox" id="precio2" name="precio2" value="50-100"/>
              <label htmlFor="precio2">$50.00 - $100.00</label>
            </li>
            <li>
              <input type="checkbox" id="precio3" name="precio3" value="100-150"/>
              <label htmlFor="precio3">$100.00 - $150.00</label>
            </li>
            <li>
              <input type="checkbox" id="precio4" name="precio4" value="150-200"/>
              <label htmlFor="precio4">$150.00 - $200.00</label>
            </li>
          </ul>
          <button>Aplicar</button>
        </aside>

        <section className='lista-productos'>
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div key={index} className='producto-item'>
              <img src={ProductoImage} alt={`Producto ${item}`} className='producto-imagen'/>
              <div className='producto-info'>
                <h3>Martillo</h3>
                <p>Marca: ABC</p>
                <p>Martillo de madera, especial para clavos y fragua. Hecho de acero y madera para mayor durabilidad.</p>
                <p>$50.00</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Producto;
