import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/NotFound.css'; // Asegúrate de que la ruta al archivo CSS sea correcta
import Header from '../View/HeaderView';
import Footer from '../View/FooterView';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <div className="order-completed-container">
      <Header />
      <main className="main-content">
        <div className="order-status">
          <div className="construction-illustration">
            <img src="https://cdn.dribbble.com/users/2703713/screenshots/8408984/error-404-800x600.gif" alt="Construction" />
          </div>
          <div className="icon">⚠️</div> 
          <h1>oops! La pagina a la que intentas acceder no esta disponible</h1>
          <p>La página que estás buscando podría haber sido eliminada, cambiada de nombre o no está disponible temporalmente.</p>
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>INICIO</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;