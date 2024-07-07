import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    const { userId } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://localhost:7271/api/Order/user/${userId}`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div>
            <Header />
            <div className="ferrushop-pedido-container">
                <h1 className="ferrushop-pedido-title">Mis Pedidos</h1>
                <div className="ferrushop-pedido-list">
                    {orders.map((order) => (
                        <div key={order.id} className="ferrushop-pedido-card">
                            <Link to={`/configuracion/pedidos/${order.id}`} className="ferrushop-pedido-link">
                                <div className="ferrushop-pedido-card-content">
                                    <div className="ferrushop-pedido-info">
                                        <h2>Pedido #{order.id}</h2>
                                        <p>Fecha: {new Date(order.orderDate).toLocaleDateString()}</p>
                                    </div>
                                    <p className="ferrushop-pedido-detalles-text">Más detalles <BsArrowRight /></p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PedidosView;
