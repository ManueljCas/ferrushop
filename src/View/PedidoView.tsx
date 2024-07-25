import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/PedidoView.css';
import { useAuth } from '../Javascript/AuthContext'; // Importar el contexto de autenticación

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
    const [loading, setLoading] = useState(true); // Estado de carga
    const { userEmail, isAuthenticated } = useAuth(); // Obtener el correo electrónico del usuario autenticado y estado de autenticación
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirigir si no está autenticado
            return;
        }

        const fetchOrder = async () => {
            try {
                console.log(`Fetching order with ID: ${orderId}`);
                const response = await fetch(`https://localhost:7271/api/Order/${orderId}`);
                if (response.status === 404) {
                    navigate('/configuracion/pedidos'); // Redirigir si no se encuentra el pedido
                    return;
                }
                const data = await response.json();
                console.log('Order data:', data);

                if (data.userEmail !== userEmail) {
                    navigate('/configuracion/pedidos'); // Redirigir si el usuario no es el propietario del pedido
                    return;
                }

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
                navigate('/configuracion/pedidos'); // Redirigir en caso de error
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        if (orderId) {
            fetchOrder();
        } else {
            console.error('Order ID is undefined');
            navigate('/configuracion/pedidos'); // Redirigir si no hay ID de pedido
        }
    }, [orderId, userEmail, isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="producto-loading-screen">
                <div className="producto-loading-spinner"></div>
                <p className="producto-loading-text">Cargando...</p>
            </div>
        );
    }

    if (!order) {
        return <div>No se pudo cargar el pedido.</div>;
    }

    return (
        <div>
            <Header />
            <div className="fshop-pedido-detalles">
                <div className="fshop-pedido-header">
                    <h1 className="fshop-pedido-mesa"><strong>ID:</strong> {order.id}</h1>
                    {order.orderItems.map((item) => (
                    <span className="fshop-pedido-estado" key={item.id}><strong>Estado:</strong> {item.status}</span>
                    ))}
                </div>
                <h1>Detalles del usuario</h1>

                    <div className="fshop-pedido-items">
                    <div className="fshop-pedido-item-card">
                    <p><strong>Usuario:</strong> {order.userName}</p>
                    <p><strong>Email:</strong> {order.userEmail}</p>
                    <p><strong>Fecha del Pedido:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                    </div>
                    
                <h1>Detalles de los productos</h1>


                <div className="fshop-pedido-items">
                    {order.orderItems.map((item) => (
                        <div className="fshop-pedido-item-card" key={item.id}>
                            <img src={images.get(item.productId)} alt={item.productName} className="fshop-pedido-item-image" />
                            <div className="fshop-pedido-item-details">
                                <p><strong>Nombre del producto:</strong></p>
                                <p>{item.productName}</p>
                                <p><strong>Cantidad:</strong></p>
                                <p> {item.quantity}</p>
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
