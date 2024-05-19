import '../Css/AgregarProducto.css';
import AgregarProductoComponent from '../Components/AgregarProductoComponent';

function AgregarProducto() {
  
  const { imagePreviews, handleImageChange } = AgregarProductoComponent();

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
            />
          </label>
        </div>

  <div className='Segunda-seccion'>
  <div className='form-group'>
    <h2>Nombre del producto</h2>
    <input type="text" placeholder='Agrega un nombre'/>
  </div>
  <div className='form-group'>
    <h2>Categoría</h2>
    <select >
    <option value="" disabled selected hidden>Agrega una categoria</option>
    <option value="categoria1">Herramientas</option>
    <option value="categoria2">Categoría 2</option>
    <option value="categoria3">Categoría 3</option>
  </select>  </div>
  <div className='form-group'>
    <h2>Precio</h2>
    <input type="number" placeholder='Agrega un precio'/>
  </div>
</div>

        <div className='Tercera-seccion'>
          <div className='form-group'>
          <h2>Agregue una breve descripción</h2>
          <input type="text" placeholder='Escriba aquí la descripción del producto' />
          </div>
          <div className='form-group'>
          <h2>Agregue una descripción completa</h2>
          <input type="text" placeholder='Escriba aquí la descripción del producto' />
          </div>
        </div>

        <div className='Cuarta-seccion'>
          <div className='form-group'>
          <h2>Agregar más detalles</h2>
          <input type="text" placeholder='Escriba aquí los detalles del producto' />
          </div>
          <div className='form-group'>
          <h2>Agregar la cantidad de unidades del producto</h2>
          <input type="number" placeholder='Agrega la cantidad del producto'/>
          </div>
        </div>

        <button>Agregar producto</button>
      </div>
    </div>
  );
}

export default AgregarProducto;