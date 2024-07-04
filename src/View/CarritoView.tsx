import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../Javascript/AuthContext'; // Importar el contexto de autenticación
import '../Css/Carrito.css';
import Header from './HeaderView';
import Footer from './FooterView';

const CarritoView: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { userEmail } = useAuth(); // Obtener el estado de autenticación
  const [products, setProducts] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productMap = new Map<number, string>();
      for (const item of cart) {
        const response = await fetch(`https://localhost:7271/api/Products/${item.productId}`);
        const data = await response.json();
        productMap.set(item.productId, `data:image/jpeg;base64,${data.images[0].data}`);
      }
      setProducts(productMap);
      setLoading(false);
    };

    fetchProducts();
  }, [cart]);

  const handleClearCart = async () => {
    await clearCart();
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const iva = subtotal * 0.14;
  const total = subtotal + iva;

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
      <div className="carrito-container">
        {cart.length === 0 ? (
          <div className="carrito-vacio">
            <p>{userEmail ? 'Tu carrito está vacío' : 'Inicia sesión para agregar producto'}</p>
            <button className="carrito-agregar-mas" onClick={() => window.location.href = userEmail ? "/producto" : "/login"}>
              {userEmail ? 'Agregar' : 'Iniciar sesión'}
            </button>
          </div>
        ) : (
          <>
            <div className="carrito-productos">
              <table className="carrito-tabla">
                <thead>
                  <tr>
                    <th className="carrito-th">Producto</th>
                    <th className="carrito-th">Nombre</th>
                    <th className="carrito-th">Precio</th>
                    <th className="carrito-th">Cantidad</th>
                    <th className="carrito-th">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.productId}>
                      <td className="carrito-td">
                        <img src={products.get(item.productId)} alt="Producto" className="carrito-img" />
                      </td>
                      <td className="carrito-td">{item.title}</td>
                      <td className="carrito-td">${item.price.toFixed(2)}</td>
                      <td className="carrito-td">{item.quantity}</td>
                      <td className="carrito-td">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="carrito-botones">
                <button className="carrito-agregar-mas" onClick={() => window.location.href = "/producto"}>Agregar más</button>
                <button className="carrito-eliminar-todo" onClick={handleClearCart}>Eliminar todo</button>
              </div>
            </div>
            <div className="carrito-total">
              <div className="carrito-totales">
                <p><span>Subtotal:</span> ${subtotal.toFixed(2)}</p>
                <p><span>IVA:</span> ${iva.toFixed(2)}</p>
                <p><span>Total:</span> ${total.toFixed(2)}</p>
              </div>
              <button className="carrito-pagar" disabled={cart.length === 0}>Pagar</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CarritoView;
