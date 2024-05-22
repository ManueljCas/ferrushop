import React from 'react';
import '../Css/OrdenCompleta.css';
import Footer from './FooterView';
import Header from './HeaderView';


interface OrdenCompletaViewProps {
  onContinueShopping: () => void;
}

const OrdenCompletaView: React.FC<OrdenCompletaViewProps> = ({ onContinueShopping }) => {
  return (

    
    <div className="order-completed-container">
        <Header />

      <main className="main-content">
        <div className="order-status">
          <div className="icon">🕒</div>
          <h1>Your Order Is Completed!</h1>
          <p>Tu orden ha sido completada, por favor envia tus datos de compra al siguiente correo, <div className='correo'><h1>sistemas@ferru.com.mx.</h1></div> Incluir datos de contacto como numero de telefono, nombre completo y tu ticket de compra.</p>
          <button className="continue-shopping-btn" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdenCompletaView;
