import { useState, ChangeEvent } from 'react';

const useAgregarProductoComponent = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleAddProduct = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      alert('Producto agregado!');
    }, 2000);
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
