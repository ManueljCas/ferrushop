import React from 'react';
import '../Css/AgregarProducto.css';
import AgregarProductoComponent from '../Components/AgregarProductoComponent';

function AgregarProducto() {
  // Desestructuramos los valores y funciones necesarios del componente AgregarProductoComponent
  const {
    imagePreviews, // Previsualizaciones de imágenes seleccionadas
    handleImageChange, // Manejador de cambio de imágenes
    handleAddProduct, // Manejador para agregar producto
    title, setTitle, // Título del producto y su setter
    description, setDescription, // Descripción breve del producto y su setter
    price, setPrice, // Precio del producto y su setter
    category, setCategory, // Categoría del producto y su setter
    quantity, setQuantity, // Cantidad del producto y su setter
    fullDescription, setFullDescription, // Descripción completa del producto y su setter
    details, setDetails, // Detalles adicionales del producto y su setter
    loading // Indicador de estado de carga
  } = AgregarProductoComponent();

  return (
    <div className='contenedor-pantalla'>
      <div className='ContenedorAgregar'>
        <h1>Agregar producto</h1>
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
              maxLength={15}
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
              max={3000}
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
              maxLength={300}
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

        <button onClick={handleAddProduct} disabled={loading}>
          {loading ? "Procesando..." : "Agregar producto"}
        </button>

      </div>
    </div>
  );
}

export default AgregarProductoView;
