import '../Css/AgregarProducto.css';
import AgregarProductoComponent from '../Components/AgregarProductoComponent';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditarProducto() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        imagePreviews,
        setImagePreviews,
        handleImageChange,
        title,
        setTitle,
        description,
        setDescription,
        price,
        setPrice,
        category,
        setCategory,
        quantity,
        setQuantity,
        fullDescription,
        setFullDescription,
        details,
        setDetails,
        loading,
        setImageFiles
    } = AgregarProductoComponent();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:7271/api/product/${id}`);
                const product = response.data;
                console.log('Fetched product:', product); // Verificar que los datos se están recibiendo

                setTitle(product.title);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setQuantity(product.quantity);
                setFullDescription(product.fullDescription);
                setDetails(product.details);
                
                // Crear vistas previas de las imágenes
                const imagePreviews = product.Images.map((image: any) => `data:image/jpeg;base64,${image}`);
                setImagePreviews(imagePreviews);

                // Crear archivos de imágenes
                const imageFiles = product.Images.map((image: any) => {
                    const byteCharacters = atob(image);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'image/jpeg' });
                    return new File([blob], `image_${Math.random()}.jpg`, { type: 'image/jpeg' });
                });
                setImageFiles(imageFiles);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id, setTitle, setDescription, setPrice, setCategory, setQuantity, setFullDescription, setDetails, setImageFiles, setImagePreviews]);

    const handleUpdateProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('fullDescription', fullDescription);
            formData.append('details', details);
            formData.append('quantity', quantity);

            imagePreviews.forEach((file) => {
                formData.append('files', file);
            });

            await axios.put(`https://localhost:7271/api/product/${id}`, formData);
            toast.success('Producto actualizado exitosamente');
            navigate('/admin');
        } catch (error) {
            toast.error('Error actualizando el producto');
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='contenedor-pantalla'>
            <div className='ContenedorAgregar'>
                <h1>Editar producto</h1>

                <div className='Imagenes-productos'>
                    <h2>Imágenes del producto</h2>
                    <span>{imagePreviews.length} archivos seleccionados</span>
                    <div>
                        {imagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`} className="preview-image" />
                        ))}
                    </div>
                    <label className="input-img-label">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            required
                        />
                    </label>
                </div>

                <div className='Segunda-seccion'>
                    <div className='form-group'>
                        <h2>Nombre del producto</h2>
                        <input
                            type="text"
                            placeholder='Agrega un nombre'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            minLength={3}
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <h2>Categoría</h2>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="" disabled hidden>Agrega una categoria</option>
                            <option value="Herramientas de Mano">Herramientas de Mano</option>
                            <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                            <option value="Material de Construcción">Material de Construcción</option>
                            <option value="Fijaciones y Sujeciones">Fijaciones y Sujeciones</option>
                            <option value="Pinturas y Acabados">Pinturas y Acabados</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <h2>Precio</h2>
                        <input
                            type="number"
                            placeholder='Agrega un precio en MXN por unidad'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min={1}
                            max={10000}
                            required
                        />
                    </div>
                </div>

                <div className='Tercera-seccion'>
                    <div className='form-group'>
                        <h2>Agregue una breve descripción</h2>
                        <input
                            type="text"
                            placeholder='Escriba aquí la descripción del producto'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minLength={10}
                            maxLength={100}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <h2>Agregue una descripción completa</h2>
                        <input
                            type="text"
                            placeholder='Escriba aquí la descripción del producto'
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            minLength={20}
                            maxLength={500}
                            required
                        />
                    </div>
                </div>

                <div className='Cuarta-seccion'>
                    <div className='form-group'>
                        <h2>Agregar más detalles</h2>
                        <input
                            type="text"
                            placeholder='Escriba aquí los detalles del producto'
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            minLength={10}
                            maxLength={500}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <h2>Agregar la cantidad de unidades del producto</h2>
                        <input
                            type="number"
                            placeholder='Agrega la cantidad del producto'
                            className='input-two'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min={1}
                            max={1000}
                            required
                        />
                    </div>
                </div>

                <button onClick={handleUpdateProduct} disabled={loading}>
                    {loading ? "Procesando..." : "Actualizar producto"}
                </button>

            </div>
        </div>
    );
}

export default EditarProducto;
