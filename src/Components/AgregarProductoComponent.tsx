import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AgregarProductoComponent = () => {
  // Definición de los estados para manejar el formulario y las imágenes
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  // Maneja el cambio de imágenes seleccionadas por el usuario
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      toast.error('Solo puedes seleccionar hasta 4 imágenes.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setImageFiles(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Maneja la adición del producto
  const handleAddProduct = async () => {
    if (imageFiles.length !== 4) {
      toast.error('Debes subir exactamente 4 imágenes.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('fullDescription', fullDescription);
    formData.append('details', details);
    formData.append('quantity', quantity);

    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('https://localhost:7271/api/Products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Producto agregado exitosamente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Limpiar los estados después de un envío exitoso
        setImageFiles([]);
        setImagePreviews([]);
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setQuantity('');
        setFullDescription('');
        setDetails('');
      } else {
        toast.error('Error al agregar el producto', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Error en la conexión', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    imagePreviews,
    handleImageChange,
    handleAddProduct,
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
    setImageFiles,
    setImagePreviews,
  };
};

export default AgregarProductoComponent;
