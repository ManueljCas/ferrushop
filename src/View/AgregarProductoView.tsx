import React from 'react';
import '../Css/AgregarProducto.css';
import AgregarProductoComponent from '../Components/AgregarProductoComponent';

const AgregarProductoView: React.FC = () => {
  return (
    <div className='contenedor-pantalla'>
      <div className='ContenedorAgregar'>
        <h1>Agregar producto</h1>
        <AgregarProductoComponent />
      </div>
    </div>
  );
}

export default AgregarProductoView;
