import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/AgregarProducto.css';

interface ImageModel {
    data: ArrayBuffer;
    preview: string;
}

interface ProductModel {
    title: string;
    category: string;
    price: number;
    description: string;
    fullDescription: string;
    details: string;
    quantity: number;
    images: ImageModel[];
}

const categories = [
    'Herramientas de Mano',
    'Herramientas Eléctricas',
    'Material de Construcción',
    'Fijaciones y Sujeciones',
    'Pinturas y Acabados'
];

function AgregarProductiView() {
    const [product, setProduct] = useState<ProductModel>({
        title: '',
        category: '',
        price: 0,
        description: '',
        fullDescription: '',
        details: '',
        quantity: 0,
        images: []
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Cleanup URLs when component unmounts or images change
        return () => {
            product.images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [product.images]);

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
                // Revoke previous URLs
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
                // Limpiar el formulario después de enviar
                setProduct({
                    title: '',
                    category: '',
                    price: 0,
                    description: '',
                    fullDescription: '',
                    details: '',
                    quantity: 0,
                    images: []
                });
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

    const handleCancel = () => {
        const confirmCancel = window.confirm("¿Estás seguro de que quieres cancelar?");
        if (confirmCancel) {
            window.location.href = "/UBKJASNnasjkn1212";
        }
    };

    return (
        <div className="ap-container">
            <ToastContainer />
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
                    <button type="button" className="ap-button ap-cancel-button" onClick={handleCancel}>
                        Salir
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AgregarProductiView;
