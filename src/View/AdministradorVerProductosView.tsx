import 'react-toastify/dist/ReactToastify.css';
import '../Css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/Administrador.css';
import Admin from '../Components/AdministradorComponen';

const AdminVerProductosView = () => {
    const [products, setProducts] = useState<any[]>([]); // Estado para almacenar la lista de productos
    const navigate = useNavigate(); // Hook de navegación para redirigir a diferentes rutas
    const AdminView = Admin(); // Componente de vista del administrador

    // useEffect para cargar los productos cuando el componente se monta
    useEffect(() => {
        fetchProducts();
    }, []);

    // Función para obtener los productos desde el servidor
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7271/api/product');
            setProducts(response.data.products); // Actualiza el estado con los productos obtenidos
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Función para manejar la edición de un producto
    const handleEdit = (id: number) => {
        navigate(`/editar-producto/${id}`); // Redirige a la página de edición del producto
    };

    // Función para manejar la eliminación de un producto
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://localhost:7271/api/product/${id}`);
            toast.success('Producto eliminado exitosamente'); // Muestra una notificación de éxito
            fetchProducts(); // Vuelve a cargar la lista de productos
        } catch (error) {
            toast.error('Error eliminando el producto'); // Muestra una notificación de error
        }
    };

    return (
        <div className="admin-container">
            <h1>Gestión de Productos</h1>
            <Link to={`/${AdminView}`} className="admin-back-button">Regresar</Link> {/* Botón para regresar a la vista de administrador */}
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <div className="product-buttons">
                            <button className="edit-button" onClick={() => handleEdit(product.id)}>Editar</button> {/* Botón para editar el producto */}
                            <button className="delete-button" onClick={() => handleDelete(product.id)}>Eliminar</button> {/* Botón para eliminar el producto */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminVerProductosView;
