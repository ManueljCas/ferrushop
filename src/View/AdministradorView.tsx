import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/Administrador.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAuth } from '../Javascript/AuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

interface ProductActivity {
    actionType: 'added' | 'deleted';
    timestamp: string;
}

const categories = [
    'Herramientas de Mano',
    'Herramientas Eléctricas',
    'Material de Construcción',
    'Fijaciones y Sujeciones',
    'Pinturas y Acabados'
];

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { logout, userRole } = useAuth();
    const [view, setView] = useState<'default' | 'add' | 'manage'>('default');
    const [product, setProduct] = useState<ProductModel>({
        id: 0,
        title: '',
        category: '',
        price: 0,
        description: '',
        fullDescription: '',
        details: '',
        quantity: 0,
        images: []
    });
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmInput, setConfirmInput] = useState('');
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const [addedProducts, setAddedProducts] = useState<number>(0);
    const [deletedProducts, setDeletedProducts] = useState<number>(0);
    const [lastAddedDate, setLastAddedDate] = useState<string>('N/A');
    const [lastDeletedDate, setLastDeletedDate] = useState<string>('N/A');

    useEffect(() => {
        if (userRole !== 'admin') {
            navigate('/U29tZUNvbnRlbnQz');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        const fetchProductActivities = async () => {
            try {
                const response = await fetch('https://localhost:7271/api/ProductActivity');
                if (response.ok) {
                    const data: ProductActivity[] = await response.json();
                    const added = data.filter(activity => activity.actionType === 'added').length;
                    const deleted = data.filter(activity => activity.actionType === 'deleted').length;
                    const lastAdded = data.filter(activity => activity.actionType === 'added').map(activity => activity.timestamp).pop() || 'N/A';
                    const lastDeleted = data.filter(activity => activity.actionType === 'deleted').map(activity => activity.timestamp).pop() || 'N/A';
                    setAddedProducts(added);
                    setDeletedProducts(deleted);
                    setLastAddedDate(lastAdded);
                    setLastDeletedDate(lastDeleted);
                } else {
                    console.error('Error fetching product activities:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product activities:', error);
            }
        };

        fetchProductActivities();
    }, []);

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

    useEffect(() => {
        return () => {
            product.images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [product.images]);

    const addProductActivity = async (actionType: 'added' | 'deleted') => {
        await fetch('https://localhost:7271/api/ProductActivity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actionType,
                timestamp: new Date().toISOString(),
            }),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };
    

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            if (files.length !== 4) {
                toast.error('Debes subir exactamente 4 imágenes.');
                return;
            }

            const newImages: ImageModel[] = await Promise.all(files.map(file => {
                return new Promise<ImageModel>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            data: reader.result as ArrayBuffer,
                            preview: URL.createObjectURL(file)
                        });
                    };
                    reader.readAsArrayBuffer(file);
                });
            }));

            setProduct(prev => {
                prev.images.forEach(image => URL.revokeObjectURL(image.preview));

                return {
                    ...prev,
                    images: newImages
                };
            });
        }
    };

    const validateForm = () => {
        if (!product.title || !product.category || !product.price || !product.description || !product.fullDescription || !product.details || !product.quantity) {
            toast.error('Todos los campos son obligatorios.');
            return false;
        }
        if (product.category === '') {
            toast.error('Debe seleccionar una categoría.');
            return false;
        }
        if (product.images.length !== 4) {
            toast.error('Debes subir exactamente 4 imágenes.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('category', product.category);
        formData.append('price', product.price.toString());
        formData.append('description', product.description);
        formData.append('fullDescription', product.fullDescription);
        formData.append('details', product.details);
        formData.append('quantity', product.quantity.toString());

        product.images.forEach((image, index) => {
            const file = new File([image.data], `image${index}.png`, { type: 'image/png' });
            formData.append('images', file);
        });

        try {
            const response = await fetch('https://localhost:7271/api/Products', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('Producto agregado exitosamente');
                setProduct({
                    id: 0,
                    title: '',
                    category: '',
                    price: 0,
                    description: '',
                    fullDescription: '',
                    details: '',
                    quantity: 0,
                    images: []
                });
                setView('default');
                setAddedProducts(prev => prev + 1);
                setLastAddedDate(new Date().toISOString());
                await addProductActivity('added');
                window.location.reload();
            } else {
                const errorText = await response.text();
                console.error('Error al agregar el producto:', errorText);
                toast.error('Error al agregar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al agregar el producto');
        } finally {
            setLoading(false);
        }
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
                setShowDeleteModal(false);
                setConfirmInput('');
                setProductIdToDelete(null);
                setDeletedProducts(prev => prev + 1);
                setLastDeletedDate(new Date().toISOString());
                await addProductActivity('deleted');
            } else {
                toast.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al eliminar el producto');
        }
    };

    const addedProductsData = {
        labels: ['Productos Agregados'],
        datasets: [
            {
                label: 'Productos Agregados',
                data: [addedProducts],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 50,
            },
        ],
    };

    const deletedProductsData = {
        labels: ['Productos Eliminados'],
        datasets: [
            {
                label: 'Productos Eliminados',
                data: [deletedProducts],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barThickness: 50,
            },
        ],
    };

    const calculateMax = (count: number) => {
        return Math.ceil((count + 1) / 10) * 10;
    };

    const chartOptions = (maxValue: number) => ({
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxValue,
                ticks: {
                    stepSize: maxValue / 10,
                }
            }
        }
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const openDeleteModal = (id: number) => {
        setProductIdToDelete(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setConfirmInput('');
        setProductIdToDelete(null);
    };

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
                navigate('/U29tZUNvbnRlbnQz');
                window.location.reload();
            }
        });
    };

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    const gridClass = filteredProducts.length >= 3 ? "product-view-grid three-columns" : "product-view-grid";

    return (
        <div className="admin-container">
            <ToastContainer />
            <div className="sidebar">
                <h1 className="sidebar-title">Admin Ferrushop</h1>
                <ul>
                    <li><button onClick={() => setView('add')}>Agregar productos</button></li>
                    <li><button onClick={() => setView('manage')}>Ver productos</button></li>
                    <li><button onClick={() => setView('default')}>Graficas</button></li>
                    <li><button onClick={handleLogout}>Salir</button></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="topbar"></div>
                <div className="content">
                    {view === 'default' && (
                        <div>
                            <h1 className="admin-title-custom">Actividad en Ferrushop</h1>
                            <div className="dashboard-container">
                                <div className="chart-card">
                                    <h2 className="chart-title">Productos Agregados</h2>
                                    <p className="chart-number">{addedProducts}</p>
                                    <div className="chart-container">
                                        <Bar data={addedProductsData} options={chartOptions(calculateMax(addedProducts))} />
                                    </div>
                                    <div className="chart-legend">
                                        <span>Última Modificación</span>
                                        <span className="chart-increase">{lastAddedDate === 'N/A' ? 'N/A' : new Date(lastAddedDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h2 className="chart-title">Productos Eliminados</h2>
                                    <p className="chart-number">{deletedProducts}</p>
                                    <div className="chart-container">
                                        <Bar data={deletedProductsData} options={chartOptions(calculateMax(deletedProducts))} />
                                    </div>
                                    <div className="chart-legend">
                                        <span>Última Modificación</span>
                                        <span className="chart-decrease">{lastDeletedDate === 'N/A' ? 'N/A' : new Date(lastDeletedDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
    
                    {view === 'add' && (
                        <div className="ap-container">
                            <h2 className="ap-title">Agregar producto</h2>
                            <h3 className="ap-subtitle">Imágenes del producto</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="ap-image-preview">
                                    {product.images.map((image, index) => (
                                        <img key={index} src={image.preview} alt={`preview-${index}`} />
                                    ))}
                                </div>
                                <div className="ap-group ap-group-1">
                                    <label className="ap-file-upload">
                                        <input className="ap-input-file" type="file" onChange={handleImageChange} multiple />
                                        <span><i className="fas fa-cloud-upload-alt"></i> Agregar imagen</span>
                                    </label>
                                </div>
                                <div className="ap-group ap-group-3">
                                    <div className="ap-item">
                                        <label className="ap-label">Nombre del producto:</label>
                                        <input className="ap-input" type="text" name="title" value={product.title} onChange={handleChange} maxLength={50} />
                                    </div>
                                    <div className="ap-item">
                                        <label className="ap-label">Categoría:</label>
                                        <select className="ap-input" name="category" value={product.category} onChange={handleChange} required>
                                            <option value="">Seleccionar categoría</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="ap-item">
                                        <label className="ap-label">Precio:</label>
                                        <input className="ap-input" type="number" name="price" value={product.price} onChange={handleChange} min={0} max={99999} />
                                    </div>
                                </div>
                                <div className="ap-group ap-group-2">
                                    <div className="ap-item">
                                        <label className="ap-label">Descripción corta:</label>
                                        <input className="ap-input" type="text" name="description" value={product.description} onChange={handleChange} maxLength={100} />
                                    </div>
                                    <div className="ap-item">
                                        <label className="ap-label">Detalles:</label>
                                        <input className="ap-input" type="text" name="details" value={product.details} onChange={handleChange} maxLength={100} />
                                    </div>
                                </div>
                                <div className="ap-group ap-group-1">
                                    <div className="ap-item">
                                        <label className="ap-label">Descripción completa:</label>
                                        <textarea className="ap-input ap-textarea" name="fullDescription" value={product.fullDescription} onChange={handleChange} maxLength={500} />
                                    </div>
                                </div>
                                <div className="ap-group ap-group-1">
                                    <div className="ap-item">
                                        <label className="ap-label">Cantidad:</label>
                                        <input className="ap-input" type="number" name="quantity" value={product.quantity} onChange={handleChange} min={1} max={1000} />
                                    </div>
                                </div>
                                <div className="ap-group ap-group-2">
                                    <button className="ap-button ap-submit-button" type="submit" disabled={loading}>
                                        {loading ? 'Agregando...' : 'Agregar Producto'}
                                    </button>
                                    <button type="button" className="ap-button ap-cancel-button" onClick={() => setView('default')}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
    
                    {view === 'manage' && (
                        <div> 
                            <h1 className='nada'>.</h1>
                            <h1 className='titulo-verproductos'>Productos en Ferrushop</h1>
                            <div className="product-view-search-container">
                                <input
                                    type="text"
                                    placeholder="Buscar por ID o nombre"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="product-view-search"
                                />
                            </div>
                            <div className={gridClass}>
                                {filteredProducts.map(product => (
                                    <div className="product-view-card" key={product.id}>
                                        <div className="product-view-image">
                                            <img src={product.images.length > 0 ? `data:image/png;base64,${product.images[0].data}` : 'placeholder-image-url'} alt={product.title} />
                                        </div>
                                        <div className='descripcion-delosproductos'>
                                            <h3 className="product-view-title">{product.title}</h3>
                                            <p className="product-view-price">Precio: ${product.price}</p>
                                            <p className="product-view-stock">A la mano: {product.quantity} Piezas</p>
                                            <button className="product-view-delete-button" onClick={() => openDeleteModal(product.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
    
                    {showDeleteModal && (
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
                                <button onClick={closeDeleteModal} className="modal-button modal-cancel-button">Cancelar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}    

export default Dashboard;