import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/AdministrarProductos.css';

interface ImageModel {
    data: ArrayBuffer;
    preview: string;
}

interface ProductModel {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    fullDescription: string;
    details: string;
    quantity: number;
    images: ImageModel[];
}

function AdministrarProductos() {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmInput, setConfirmInput] = useState('');
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7271/api/Products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Error fetching products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async () => {
        if (confirmInput !== 'CONFIRMAR' || productIdToDelete === null) {
            toast.error('Debes escribir CONFIRMAR para eliminar el producto');
            return;
        }

        try {
            const response = await fetch(`https://localhost:7271/api/Products/${productIdToDelete}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== productIdToDelete));
                toast.success('Producto eliminado exitosamente');
                setShowModal(false);
                setConfirmInput('');
                setProductIdToDelete(null);
            } else {
                toast.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al eliminar el producto');
        }
    };

    const openModal = (id: number) => {
        setProductIdToDelete(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setConfirmInput('');
        setProductIdToDelete(null);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    const handleBack = () => {
        navigate('/UBKJASNnasjkn1212');
    };

    return (
        <div className="admin-container">
            <ToastContainer />
            <h2 className="admin-title">Administrar Productos</h2>
            <button onClick={handleBack} className="admin-back-button">Regresar</button>

            <input
                type="text"
                placeholder="Buscar por ID o nombre"
                value={searchTerm}
                onChange={handleSearchChange}
                className="admin-search"
            />
            <div className="admin-card-container">
                {filteredProducts.map(product => (
                    <div className="admin-card" key={product.id}>
                        <div className="admin-card-image">
                            <img src={`data:image/png;base64,${product.images[0]?.data}`} alt={product.title} />
                        </div>
                        <div className="admin-card-content">
                            <h3 className="admin-card-title">{product.title}</h3>
                            <p className="admin-card-category">{product.category}</p>
                            <p className="admin-card-price">${product.price}</p>
                            <p className="admin-card-description">{product.description}</p>
                        </div>
                        <button className="admin-card-delete-button" onClick={() => openModal(product.id)}>
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirmar Eliminación</h3>
                        <p>Escribe CONFIRMAR para eliminar el producto:</p>
                        <input
                            type="text"
                            value={confirmInput}
                            onChange={(e) => setConfirmInput(e.target.value)}
                            className="modal-input"
                        />
                        <button onClick={handleDelete} className="modal-button">Eliminar</button>
                        <button onClick={closeModal} className="modal-button modal-cancel-button">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdministrarProductos;
