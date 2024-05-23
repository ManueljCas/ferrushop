import React from 'react';
import OrdenCompletaView from '../View/OrdenCompletaView';
import { useNavigate } from 'react-router-dom';

const OrdenCompleta: React.FC = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); // Redirige a la página de inicio
  };

  return <OrdenCompletaView onContinueShopping={handleContinueShopping} />;
};

export default OrdenCompleta;