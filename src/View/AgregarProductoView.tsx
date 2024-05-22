import React from 'react';
import useAgregarProductoComponent from '../hooks/useAgregarProductoComponent';

const AgregarProductoView: React.FC = () => {
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

  return (
    <div className='contenedor-pantalla'>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input type="file" multiple onChange={handleImageChange} />
      <div>
        {imagePreviews.map((preview: string, index: number) => (
          <img key={index} src={preview} alt={`Preview ${index}`} className="preview-image" style={{ width: 100, height: 100 }} />
        ))}
      </div>
      <button onClick={handleAddProduct} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default AgregarProductoView;
