import { useState, ChangeEvent } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useAgregarProductoComponent = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setImages(files);
  };

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      // Subir imágenes a Firebase Storage y obtener las URLs
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `products/${image.name}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );

      // Agregar documento a la colección de Firestore
      await addDoc(collection(db, 'products'), {
        title,
        description,
        price,
        images: imageUrls,
      });

      setLoading(false);
      alert('Producto agregado!');
    } catch (error) {
      console.error('Error adding product: ', error);
      setLoading(false);
      alert('Error al agregar el producto');
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
    loading,
  };
};

export default useAgregarProductoComponent;
