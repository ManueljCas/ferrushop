import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/PedidoView.css';

interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    status: string;
}

interface Order {
    id: number;
    userId: number;
    userName: string;
    userEmail: string;
    orderDate: string;
    orderItems: OrderItem[];
}

const PedidoView: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [images, setImages] = useState<Map<number, string>>(new Map());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                console.log(`Fetching order with ID: ${orderId}`);
                const response = await fetch(`https://localhost:7271/api/Order/${orderId}`);
                const data = await response.json();
                console.log('Order data:', data);
                setOrder(data);

                // Fetch images for each product in the order
                const imageMap = new Map<number, string>();
                for (const item of data.orderItems) {
                    const imageResponse = await fetch(`https://localhost:7271/api/Products/${item.productId}`);
                    const imageData = await imageResponse.json();
                    imageMap.set(item.productId, `data:image/jpeg;base64,${imageData.images[0].data}`);
                }
                setImages(imageMap);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (orderId) {
            fetchOrder();
        } else {
            console.error('Order ID is undefined');
        }
    }, [orderId]);

    if (!order) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Header />
            <div className="fshop-pedido-detalles">
                <h1>Detalles del Pedido #{order.id}</h1>
                <p><strong>Usuario:</strong> {order.userName}</p>
                <p><strong>Email:</strong> {order.userEmail}</p>
                <p><strong>Fecha del Pedido:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <h2>Items del Pedido</h2>
                <div className="fshop-pedido-items">
                    {order.orderItems.map((item) => (
                        <div className="fshop-pedido-item-card" key={item.id}>
                            <img src={images.get(item.productId)} alt={item.productName} className="fshop-pedido-item-image" />
                            <div className="fshop-pedido-item-details">
                                <p><strong>{item.productName}</strong></p>
                                <p><strong>Cantidad:</strong> {item.quantity}</p>
                                <p><strong>Estado:</strong> {item.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="fshop-pedido-back-button" onClick={() => navigate(-1)}>Regresar</button>
            </div>
            <Footer />
        </div>
    );
};

export default PedidoView;
