import React from 'react';
import '../Css/Carrito.css';
import Header from './HeaderView';
import Footer from './FooterView';
import { useCart } from '../context/CartContext';

const CarritoView = () => {
  const { cart } = useCart();

  console.log('Current cart in CarritoView:', cart); // Debug message

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
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={`data:image/jpeg;base64,${item.image}`} alt="Producto" id='Carrito-img' />
                    <div>
                      <p>{item.title}</p>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-input">
                      <input type="text" value={item.quantity} readOnly />
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
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
            <p>Subtotal: <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span></p>
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
