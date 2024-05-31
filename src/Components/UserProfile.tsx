import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../View/HeaderView';
import '../Css/UserProfile.css';

const UserProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <Header />
      <div className="user-profile">
        <h2>Perfil de Usuario</h2>
        <p><strong>Nombre:</strong> {currentUser.displayName || 'N/A'}</p>
        <p><strong>Correo electrónico:</strong> {currentUser.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
