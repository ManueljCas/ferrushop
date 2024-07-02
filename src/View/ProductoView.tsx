import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Css/Producto.css';
import Header from './HeaderView';
import Footer from './FooterView';
import Grid from '@material-ui/core/Grid';
import { useProductos } from '../Components/ProductosComponent';

const Producto: React.FC = () => {
  const { products } = useProductos();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleProductClick = (id: number) => {
    try {
      navigate(`/producto/${id}`);
    } catch (error) {
      toast.error('Error al navegar a la descripción del producto');
      console.error('Navigation error:', error);
    }
  };

  const handleChangeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(cat => cat !== value)
    );
  };

  const handleChangePrices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedPrices(prev =>
      checked ? [...prev, value] : prev.filter(price => price !== value)
    );
  };

  const applyFilters = () => {
    const filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(priceRange => {
        const [min, max] = priceRange.split('-').map(Number);
        return product.price >= min && product.price <= max;
      });
      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
    setVisibleCount(5); // Reset visible count when applying new filters
  };

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
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
                    onChange={handleChangeCategories}
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
                    onChange={handleChangePrices}
                  />
                  <label htmlFor={`precio${idx + 1}`}>{`$${price.split('-').join(' - $')}`}</label>
                </li>
              ))}
            </ul>
            <button onClick={applyFilters}>Aplicar</button>
          </Grid>

          <Grid item xs={12} md={9} className="lista-productos">
            <Grid container spacing={3}>
              {filteredProducts.slice(0, visibleCount).map((product) => (
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
            {visibleCount < filteredProducts.length && (
              <div className="show-more-container">
                <button onClick={handleLoadMore} className="show-more-button">Más productos</button>
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
