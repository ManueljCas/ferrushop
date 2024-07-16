import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/DescripcionProductos.css'; 
import Header from './HeaderView';
import Footer from './FooterView';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../Javascript/AuthContext';

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
  const { addToCart } = useCart();
  const { userEmail } = useAuth();

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://localhost:7271/api/Products/${id}`);
        setProduct(response.data);

        await Promise.all(response.data.images.map((image: { data: string }) => loadImage(`data:image/jpeg;base64,${image.data}`)));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              toast.error('Producto no encontrado');
            } else {
              toast.error(`Error ${error.response.status}: ${error.response.data}`);
            }
          } else if (error.request) {
            toast.error('No se recibió respuesta del servidor');
          } else {
            toast.error(`Error: ${error.message}`);
          }
        } else {
          toast.error('Error desconocido al cargar los datos del producto');
        }
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

  const handleAddToCart = async () => {
    if (!product) {
      toast.error('Producto no encontrado');
      return;
    }

    if (!userEmail) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => {
        toast.info('Haz clic aquí para iniciar sesión', {
          onClick: () => (window.location.href = '/login'),
          autoClose: false,
        });
      }, 500);
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
      toast.success('Producto agregado al carrito');
    } catch (error) {
      toast.error('Error al agregar el producto al carrito');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="producto-loading-screen">
        <div className="producto-loading-spinner"></div>
        <p className="producto-loading-text">Cargando...</p>
      </div>
    );
  }

  if (!product) {
    return <p>No se encontró el producto</p>;
  }

  return (
    <div>
      <Header/>
      <div className="producto-contenedor-detalles">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <div className="producto-descripcion">
              <div className="producto-imagenes">
                <div className="producto-demas-imagenes">
                  {product.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={`data:image/jpeg;base64,${image.data}`} 
                      alt={`Imagen ${index + 1}`} 
                      className="producto-imagen-pequena" 
                      onClick={() => handleOpen(`data:image/jpeg;base64,${image.data}`)} 
                    />
                  ))}
                </div>
                <div className="producto-primera-imagen">
                  <img 
                    src={`data:image/jpeg;base64,${product.images[0].data}`} 
                    alt="Imagen Principal" 
                    className="producto-imagen-principal" 
                    onClick={() => handleOpen(`data:image/jpeg;base64,${product.images[0].data}`)} 
                  />
                </div>
              </div>
              
              <div className="producto-caracteristicas-descripcion">
                <h1>{product.title}</h1>
                <p className="producto-precio">Precio: <span>${product.price}</span></p>
                <h2>Categoría: <span>{product.category}</span></h2>
                <p className="producto-descripcion-texto">Descripción: {product.description}</p>
                <p>Cantidad: {product.quantity}</p>
                <button onClick={handleAddToCart}>Comprar Ahora</button>
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
  className="producto-modal"
>
  <div className="producto-modal-content">
    <img src={selectedImage} alt="Imagen en grande" className="producto-imagen-grande" />
  </div>
</Modal>


      <div className="producto-contenedor-descripcion">
        <h1>Descripción</h1>
        <h2>Resumen</h2>
        <p>{product.details}</p>
        <h2>Más detalles</h2>
        <p>{product.fullDescription}</p>
      </div>

      <Footer />
    </div>
  );
};

export default ProductoDescripcion;
