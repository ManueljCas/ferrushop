import React from 'react';
import '../Css/Carrito.css';
import Header from './HeaderView';
import Footer from './FooterView';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CarritoView = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const response = await fetch('https://localhost:7271/api/Carrito/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      })
    });

    if (response.ok) {
      alert('Checkout successful!');
      clearCart(); // Vaciar el carrito después del checkout
    } else {
      const errorMessage = await response.text();
      alert(`Checkout failed: ${errorMessage}`);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleAddMore = () => {
    navigate('/producto');
  };

  return (
    <div>
      <Header />
      <div className="carrito-container">
        {cart.length === 0 ? (
          <div className="carrito-vacio">
            <p>Agrega un producto y aquí aparecerán</p>
            <button className="agregar-mas" onClick={handleAddMore}>Agregar productos</button>
          </div>
        ) : (
          <>
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
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-input">
                          <input type="text" value={item.quantity} readOnly />
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="botones-carrito">
                <button className="agregar-mas" onClick={handleAddMore}>Agregar más</button>
                <button className="eliminar-todo" onClick={handleClearCart}>Eliminar todo</button>
              </div>
            </div>
            <div className="total-carrito">
              <h3>Cart Totals</h3>
              <div className="totales">
                <p>Subtotal: <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span></p>
                <p>Shipping & taxes calculated at checkout</p>
              </div>
              <button className="pagar" onClick={handleCheckout}>Pagar</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CarritoView;
