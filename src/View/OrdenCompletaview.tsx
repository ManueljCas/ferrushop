import React from 'react';
import '../Css/OrdenCompleta.css';

interface OrdenCompletaViewProps {
  onContinueShopping: () => void;
}

const OrdenCompletaView: React.FC<OrdenCompletaViewProps> = ({ onContinueShopping }) => {
  return (
    <div className="order-completed-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">Ferrushop</div>
          <nav className="nav">
            <a href="/">Inicio</a>
            <a href="/">Pages</a>
            <a href="/">Products</a>
            <a href="/">Shop</a>
            <a href="/">Contact</a>
          </nav>
          <div className="header-right">
            <a href="/">Login</a>
            <a href="/">Cart</a>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="order-status">
          <div className="icon">🕒</div>
          <h1>Your Order Is Completed!</h1>
          <p>Tu orden ha sido completada, por favor envia tus datos de compra al siguiente correo, <div className='correo'><h1>sistemas@ferru.com.mx.</h1></div> Incluir datos de contacto como numero de telefono, nombre completo y tu ticket de compra.</p>
          <button className="continue-shopping-btn" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Ferrushop</h2>
            <p>Contact Info</p>
            <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
          </div>
          <div className="footer-section">
            <h2>Customer Care</h2>
            <a href="/">My Account</a>
            <a href="/">Discount</a>
            <a href="/">Returns</a>
            <a href="/">Orders History</a>
            <a href="/">Order Tracking</a>
          </div>
          <div className="footer-section">
            <h2>Pages</h2>
            <a href="/">Blog</a>
            <a href="/">Browse the Shop</a>
            <a href="/">Category</a>
            <a href="/">Pre-Built Pages</a>
            <a href="/">Visual Composer Elements</a>
            <a href="/">WooCommerce Pages</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrdenCompletaView;
