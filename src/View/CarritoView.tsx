import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../Javascript/AuthContext'; // Importar el contexto de autenticación
import '../Css/Carrito.css';
import Header from './HeaderView';
import Footer from './FooterView';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const CarritoView: React.FC = () => {
  const { cart, clearCart, setTotals } = useCart();
  const { userEmail } = useAuth(); // Obtener el estado de autenticación
  const [products, setProducts] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Usar useNavigate para la redirección

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

  const handlePagar = () => {
    navigate('/pasareladepago');
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const iva = subtotal * 0.14;
  const total = subtotal + iva;

  useEffect(() => {
    setTotals(subtotal, iva, total);
  }, [subtotal, iva, total, setTotals]);

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
      <Grid container className="carrito-container" spacing={3}>
        {cart.length === 0 ? (
          <Grid container justifyContent="center" alignItems="center" className="carrito-vacio">
            <Grid item xs={12}>
              <p>{userEmail ? 'Tu carrito está vacío' : 'Inicia sesión para agregar un producto'}</p>
              <button className="carrito-agregar-mas" onClick={() => window.location.href = userEmail ? "/producto" : "/login"}>
                {userEmail ? 'Agregar un producto' : 'Iniciar sesión'}
              </button>
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={8} className="carrito-productos">
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
                      <td className="carrito-td precio">{item.price.toFixed(2)}</td>
                      <td className="carrito-td">{item.quantity}</td>
                      <td className="carrito-td total">{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="carrito-botones">
                <button className="carrito-agregar-mas" onClick={() => window.location.href = "/producto"}>Agregar más</button>
                <button className="carrito-eliminar-todo" onClick={handleClearCart}>Eliminar todo</button>
              </div>
            </Grid>
            <Grid item xs={12} md={4} className="carrito-total">
              <div className="carrito-totales">
                <p><span>Subtotal:</span> ${subtotal.toFixed(2)}</p>
                <p><span>IVA:</span> ${iva.toFixed(2)}</p>
                <p><span>Total:</span> ${total.toFixed(2)}</p>
              </div>
              <button className="carrito-pagar" onClick={handlePagar} disabled={cart.length === 0}>Pagar</button>
            </Grid>
          </>
        )}
      </Grid>
      <Footer />
    </div>
  );
};

export default CarritoView;
