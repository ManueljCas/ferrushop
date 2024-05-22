import useAgregarProductoComponent from '../hooks/useAgregarProductoComponent';

const AgregarProductoComponent = () => {
  const {
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
  } = useAgregarProductoComponent();

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

export default AgregarProductoComponent;
