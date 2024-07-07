import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/Configuracion.css';
import { useAuth } from '../Javascript/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Header from "./HeaderView";
import Footer from "./FooterView";
import { BsChevronRight } from "react-icons/bs";

const ConfiguracionView: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, userId } = useAuth();
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirigir si no está autenticado
            return;
        }

        const fetchOrderCount = async () => {
            if (isAuthenticated && userId) {
                try {
                    const response = await fetch(`https://localhost:7271/api/Order/user/${userId}`);
                    if (response.ok) {
                        const orders = await response.json();
                        setOrderCount(orders.length);
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };

        fetchOrderCount();
    }, [isAuthenticated, userId, navigate]);

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
            <Header />
            <div className="configuracion-container">
                <div className="configuracion-card">
                    <h2>Configuración</h2>
                    <div className="configuracion-opcion" onClick={() => navigate('/configuracion/editarperfil')}>
                        <div className="configuracion-texto">Editar Perfil <BsChevronRight /></div>
                    </div>
                    <div className="configuracion-opcion" onClick={() => navigate('/configuracion/pedidos')}>
                        <div className="configuracion-texto">
                            Pedidos
                            {orderCount > 0 && <span className="order-count">{orderCount}</span>}
                            <BsChevronRight />
                        </div>
                    </div>
                    <div className="configuracion-opcion" onClick={() => navigate('/TerminosCondiciones')}>
                        <div className="configuracion-texto">Términos y Condiciones <BsChevronRight /></div>
                    </div>
                    {isAuthenticated && (
                        <div className="configuracion-opcion" onClick={handleLogout}>
                            <div className="configuracion-texto">Cerrar Sesión <BsChevronRight /></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ConfiguracionView;
