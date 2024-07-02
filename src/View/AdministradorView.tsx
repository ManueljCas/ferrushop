import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Administrador.css';
import 'react-toastify/dist/ReactToastify.css';

const Administrador = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-container-custom">
            <h1 className="admin-title-custom">Ferrushop</h1>
            <h2 className="admin-subtitle-custom">¿Qué queremos hacer hoy?</h2>
            <div className="admin-links-custom">
                <button onClick={() => navigate('/QWdyZYs1RU03AK')} className="admin-button-custom">Ver productos</button>
                <button onClick={() => navigate('/QWdyZWdhclByb2R1Y3Rv')} className="admin-button-custom">Agregar productos</button>
                <button onClick={() => navigate('/U29tZUNvbnRlbnQz')} className="admin-button-custom">Salir</button>
            </div>
        </div>
    );
};

export default Administrador;
