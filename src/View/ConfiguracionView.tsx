import React from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/Configuracion.css';
import { useAuth } from '../Javascript/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Header from "./HeaderView";
import Footer from "./FooterView";


const ConfiguracionView: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: '¿Estás seguro de que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                toast.success('Has cerrado sesión', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: 'logout-toast',
                });
                navigate('/');
                window.location.reload(); // Recarga la página después de la navegación
            }
        });
    };

    return (
        <>
        <Header/>
            <div className="configuracion-container">
                <div className="configuracion-card">
                    <h2>Configuración</h2>
                    <div className="configuracion-opcion" onClick={() => navigate('/editar-perfil')}>
                        <div className="configuracion-texto">Editar Perfil</div>
                    </div>
                    <div className="configuracion-opcion" onClick={() => navigate('/terminos-condiciones')}>
                        <div className="configuracion-texto">Pedidos</div>
                    </div>
                    <div className="configuracion-opcion" onClick={() => navigate('/terminos-condiciones')}>
                        <div className="configuracion-texto">Términos y Condiciones</div>
                    </div>
                    {isAuthenticated && (
                        <div className="configuracion-opcion" onClick={handleLogout}>
                            <div className="configuracion-texto">Cerrar Sesión</div>
                        </div>
                    )}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ConfiguracionView;
