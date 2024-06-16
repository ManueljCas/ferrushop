import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Css/Producto.css';
import Header from './HeaderView';
import Footer from './FooterView';
import Grid from '@material-ui/core/Grid';
import { useProductos } from '../Components/ProductosComponent';

const Producto: React.FC = () => {
  const {
    products,
    hasMore,
    setSelectedCategories,
    setSelectedPrices,
    handleChange,
    handleShowMore,
    handleApplyFilters,
  } = useProductos();
  
  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    try {
      navigate(`/producto/${id}`);
    } catch (error) {
      toast.error('Error al navegar a la descripción del producto');
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="contenedor-principal">
      <Header />

      <div className="contenedor-seccion-productos">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} className="filtro-precio">
            <h1>Filtro</h1>
            <ul>
              <h3>Categorías</h3>
              {['Herramientas de Mano', 'Herramientas Eléctricas', 'Material de Construcción', 'Fijaciones y Sujeciones', 'Pinturas y Acabados'].map((cat, idx) => (
                <li key={idx}>
                  <input
                    type="checkbox"
                    id={`categoria${idx + 1}`}
                    value={cat}
                    onChange={handleChange(setSelectedCategories)}
                  />
                  <label htmlFor={`categoria${idx + 1}`}>{cat}</label>
                </li>
              ))}
              <h3>Precios</h3>
              {['0-50', '50-100', '100-150', '150-200'].map((price, idx) => (
                <li key={idx}>
                  <input
                    type="checkbox"
                    id={`precio${idx + 1}`}
                    value={price}
                    onChange={handleChange(setSelectedPrices)}
                  />
                  <label htmlFor={`precio${idx + 1}`}>{`$${price.split('-').join(' - $')}`}</label>
                </li>
              ))}
            </ul>
            <button onClick={handleApplyFilters}>Aplicar</button>
          </Grid>

          <Grid item xs={12} md={9} className="lista-productos">
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} key={product.id} onClick={() => handleProductClick(product.id)}>
                  <div className="producto-item">
                    {product.images && product.images[0] && product.images[0].data ? (
                      <img
                        src={`data:image/jpeg;base64,${product.images[0].data}`}
                        alt={`Producto ${product.title}`}
                        className="producto-imagen"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div className="producto-info">
                      <h3>{product.title}</h3>
                      <p>${product.price}</p>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
            {hasMore && (
              <div className="show-more-container">
                <button onClick={handleShowMore} className="show-more-button">Mostrar más</button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default Producto;
