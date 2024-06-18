import React from 'react';
import '../Css/Carrito.css';
import Header from './HeaderView';
import Footer from './FooterView';
import martillo from '../IMG/martillo.png';
import CarritoComponent from '../Components/CarritoComponent';

const CarritoView = () => {
  return (
    <div>
      <Header />
      <div className="carrito-container">
        <div className="carrito-productos">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={martillo} alt="Producto" id='Carrito-img'/>
                  <div>
                    <p>Nombre del Producto</p>
                    <p>Color: Brown</p>
                    <p>Size: XL</p>
                  </div>
                </td>
                <td>$30.00</td>
                <td>
                  <CarritoComponent initialQuantity={1}>
                    {(quantity, increment, decrement) => (
                      <div className="quantity-input">
                        <button onClick={decrement}>-</button>
                        <input type="text" value={quantity} readOnly />
                        <button onClick={increment}>+</button>
                      </div>
                    )}
                  </CarritoComponent>
                </td>
                <td>${30.00 * 1}</td>
              </tr>
            </tbody>
          </table>
          <div className="botones-carrito">
            <button className="agregar-mas">Agregar más</button>
            <button className="eliminar-todo">Eliminar todo</button>
          </div>
        </div>
        <div className="total-carrito">
          <h3>Cart Totals</h3>
          <div className="totales">
            <p>Subtotal: <span>$219.00</span></p>
            <p>Total: <span>$325.00</span></p>
            <p>Shipping & taxes calculated at checkout</p>
          </div>
          <button className="pagar">Pagar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarritoView;
