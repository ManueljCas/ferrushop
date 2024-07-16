import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Javascript/AuthContext';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/PedidosView.css';
import { BsArrowRight } from "react-icons/bs";

interface Order {
    id: number;
    orderDate: string;
}

const PedidosView: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { userId, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirigir si no está autenticado
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://localhost:7271/api/Order/user/${userId}`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchOrders();
    }, [userId, isAuthenticated, navigate]);

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
            <div className="pedido-container">
                {orders.length === 0 ? (
                    <div className="pedido-vacio">
                        <p>{userId ? 'No tienes pedidos en este momento.' : 'Inicia sesión para ver tus pedidos'}</p>
                        <button className="pedido-agregar-mas" onClick={() => window.location.href = userId ? "/producto" : "/login"}>
                            {userId ? 'Agregar un producto' : 'Iniciar sesión'}
                        </button>
                    </div>
                ) : (
                    <>
                        <h1 className="pedido-title">Mis Pedidos</h1>
                        <button className="pedido-regresar" onClick={() => navigate('/')}>Regresar</button>
                        <div className="pedido-list">
                            {orders.map((order) => (
                                <div key={order.id} className="pedido-card">
                                    <Link to={`/configuracion/pedidos/${order.id}`} className="pedido-link">
                                        <div className="pedido-card-content">
                                            <div className="pedido-info">
                                                <h2>Pedido #{order.id}</h2>
                                                <p>Fecha: {new Date(order.orderDate).toLocaleDateString()}</p>
                                            </div>
                                            <p className="pedido-detalles-text">Más detalles <BsArrowRight /></p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PedidosView;
