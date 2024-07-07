import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/PasarelaDePago.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../Javascript/AuthContext';

const PasarelaDePagoView: React.FC = () => {
  const [orderID, setOrderID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { cart, clearCart, total: storedTotal } = useCart();
  const { userId, userEmail } = useAuth(); // Quitamos userName de aquí
  const [userName, setUserName] = useState<string>(''); // Nuevo estado para userName
  const [localTotal, setLocalTotal] = useState<number>(0);
  const [localSubtotal, setLocalSubtotal] = useState<number>(0);
  const [localIva, setLocalIva] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`https://localhost:7271/api/Usuario/${userId}`);
        if (!response.ok) {
          throw new Error(`Solicitud fallida con el código de estado ${response.status}`);
        }
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        setError('Error al obtener el nombre del usuario');
      }
    };

    fetchUserName();
  }, [userId]);

  useEffect(() => {
    const calcularTotales = () => {
      const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const iva = subtotal * 0.14;
      const total = subtotal + iva;
      setLocalSubtotal(subtotal);
      setLocalIva(iva);
      setLocalTotal(total);
      localStorage.setItem('localSubtotal', subtotal.toString());
      localStorage.setItem('localIva', iva.toString());
      localStorage.setItem('localTotal', total.toString());
    };

    calcularTotales();
  }, [cart]);

  useEffect(() => {
    const storedSubtotal = localStorage.getItem('localSubtotal');
    const storedIva = localStorage.getItem('localIva');
    const storedTotal = localStorage.getItem('localTotal');
    
    if (storedSubtotal && storedIva && storedTotal) {
      setLocalSubtotal(parseFloat(storedSubtotal));
      setLocalIva(parseFloat(storedIva));
      setLocalTotal(parseFloat(storedTotal));
    }

    // Simular un tiempo de carga para la pantalla de carga
    const loadContent = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Ajusta el tiempo según tus necesidades
      setLoading(false);
    };

    loadContent();
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/carrito');
    }
  }, [cart, navigate]);

  const handleApprove = async (orderID: string) => {
    setOrderID(orderID);
    await guardarOrden();
    alert('Pago realizado con éxito');
    navigate('/pagocompletado'); // Redirigir al usuario a /pagocompletado
  };

  const guardarOrden = async () => {
    const orderData = {
      userId,
      userName, // Utilizamos el userName del estado
      userEmail,
      orderItems: cart.map(item => ({
        productId: item.productId,
        productName: item.title,
        quantity: item.quantity,
        status: 'No entregado'
      })),
      totalAmount: localTotal // Agregar el totalAmount aquí
    };

    try {
      const response = await fetch('https://localhost:7271/api/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
      } else {
        const errorData = await response.json();
        setError(`Error al guardar la orden: ${errorData.title}`);
      }
    } catch (err) {
      setError('Error al guardar la orden');
    }
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
    if (localTotal <= 0) {
      setError('El total debe ser mayor a cero.');
      return Promise.reject(new Error('El total debe ser mayor a cero.'));
    }
    if (localTotal !== storedTotal) {
      setError('No manipule las cantidades. Los totales no coinciden.');
      return Promise.reject(new Error('No manipule las cantidades. Los totales no coinciden.'));
    }
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          value: localTotal.toFixed(2),
          currency_code: 'MXN',
        },
      }],
    }).catch((err: unknown) => {
      setError(err instanceof Error ? err.toString() : 'An unknown error occurred');
      return Promise.reject(err);
    });
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = (data, actions) => {
    if (actions.order) {
      return actions.order.capture().then(() => {
        handleApprove(data.orderID);
      }).catch((err: unknown) => {
        setError(err instanceof Error ? err.toString() : 'An unknown error occurred');
        return Promise.reject(err);
      });
    } else {
      setError('Actions order is undefined');
      return Promise.reject(new Error('Actions order is undefined'));
    }
  };

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
      <div className="pasarela-container">
        <div className="total-carrito">
          <h3>Total del Carrito</h3>
          <p><span>Subtotal:</span> ${localSubtotal.toFixed(2)}</p>
          <p><span>IVA:</span> ${localIva.toFixed(2)}</p>
          <hr />
          <p>Este es el total a pagar:</p>
          <p><span>Total:</span> ${localTotal.toFixed(2)}</p>

          <div className="paypal-button-container">
            <PayPalScriptProvider options={{ "clientId": "Ad84GqqpJZlvhCzcYhrwWmeeIdwK3a5Nk1Ap5R7qvqMxw_mnsxYKvjXRSoLPoS8Dy4nghaXumXwa5vnI", currency: "MXN" }}>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={(err: unknown) => {
                  setError(err instanceof Error ? err.toString() : 'An unknown error occurred');
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
        {orderID && <p>Order ID: {orderID}</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default PasarelaDePagoView;
