import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/PasarelaDePago.css';
import { useCart } from '../context/CartContext';

const PasarelaDePagoView: React.FC = () => {
  const [orderID, setOrderID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { cart, subtotal: storedSubtotal, iva: storedIva, total: storedTotal } = useCart();
  const [localTotal, setLocalTotal] = useState<number>(0);
  const [localSubtotal, setLocalSubtotal] = useState<number>(0);
  const [localIva, setLocalIva] = useState<number>(0);

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
  }, []);

  const handleApprove = (orderID: string) => {
    setOrderID(orderID);
    alert('Pago realizado con éxito');
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
    console.log('Local Total:', localTotal);
    console.log('Local Subtotal:', localSubtotal);
    console.log('Local IVA:', localIva);
    console.log('Stored Subtotal:', storedSubtotal);
    console.log('Stored IVA:', storedIva);
    console.log('Stored Total:', storedTotal);
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

  return (
    <div>
      <Header />
      <div className="pasarela-container">
        <div className="total-carrito">
          <h3>Total del Carrito</h3>
          <p><span>Subtotal:</span> ${storedSubtotal.toFixed(2)}</p>
          <p><span>IVA:</span> ${storedIva.toFixed(2)}</p>
          <hr />
          <p>Este es el total a pagar:</p>
          <p><span>Total:</span> ${storedTotal.toFixed(2)}</p>

          <div className="paypal-button-container">
            <PayPalScriptProvider options={{ "clientId": "AXXgxkmyimplFmm_xRQ0_w7I6Nb59kKFWzrfyazZOqOInRUqcAy1-fanv8awb9U2l6UcFgYdq0bdT8AY", currency: "MXN" }}>
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
