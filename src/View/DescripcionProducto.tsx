import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/DescripcionProductos.css';
import Header from './HeaderView';
import Footer from './FooterView';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  fullDescription: string;
  details: string;
  quantity: number;
  images: { data: string }[];
}

const ProductoDescripcion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        console.log('Fetching product data for ID:', id); // Mensaje de depuración
        const response = await axios.get(`https://localhost:7271/api/Products/${id}`);
        console.log('Product data received:', response.data); // Mensaje de depuración
        setProduct(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // El servidor respondió con un estado fuera del rango 2xx
            toast.error(`Error ${error.response.status}: ${error.response.data}`);
          } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            toast.error('No se recibió respuesta del servidor');
          } else {
            // Algo pasó al configurar la solicitud
            toast.error(`Error: ${error.message}`);
          }
        } else {
          toast.error('Error desconocido al cargar los datos del producto');
        }
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return <p>No se encontró el producto</p>;
  }

  return (
    <div>
      <Header />

      <div className="contenedor-detalles-producto">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <div className="descripcion-producto">
              <div className="imagenes-producto">
                <div className="demas-imagenes">
                  {product.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={`data:image/jpeg;base64,${image.data}`} 
                      alt={`Imagen ${index + 1}`} 
                      className="imagen-pequena" 
                      onClick={() => handleOpen(`data:image/jpeg;base64,${image.data}`)} 
                    />
                  ))}
                </div>
                <div className="primera-imagen">
                  <img 
                    src={`data:image/jpeg;base64,${product.images[0].data}`} 
                    alt="Imagen Principal" 
                    className="imagen-principal" 
                    onClick={() => handleOpen(`data:image/jpeg;base64,${product.images[0].data}`)} 
                  />
                </div>
              </div>
              
              <div className="caracteristicas-descripcion">
                <h1>{product.title}</h1>
                <p className="precio">Precio: <span>${product.price}</span></p>
                <h2>Categoría: <span>{product.category}</span></h2>
                <p className="descripcion">Descripción: {product.description}</p>
                <p>Cantidad: {product.quantity}</p>
                <button>Comprar Ahora</button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal"
      >
        <div className="modal-content">
          <img src={selectedImage} alt="Imagen en grande" className="imagen-grande" />
        </div>
      </Modal>

      <div className="contenedor-descripcion-productos">
        <h1>Descripción</h1>
        <h2>Resumen</h2>
        <p>{product.fullDescription}</p>
        <h2>Más detalles</h2>
        <p>{product.details}</p>
      </div>

      <Footer />
    </div>
  );
};

export default ProductoDescripcion;
