import React from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Inicio.css';
import useInicioComponent from '../Components/InicioComponent';
import NosotrosComponent from '../Components/NosotrosComponent';
import ProductoImage from '../IMG/Perico.png';
import Serrucho from '../IMG/Serrucho.png';
import Desarmador from '../IMG/Desarmador.png';
import CintaMetica from '../IMG/Desarmador.png';
import Pinzas from '../IMG/Pinsas.png';
import FondoSeguirviendo from '../IMG/FondoSeguirviendo.png';
import Empresas from '../IMG/Empresas.png';
import Grid from '@material-ui/core/Grid';

const Inicio = () => {
  const { currentSlide, images, currentGroup, carrucel2, nextGroup, prevGroup, handleChangeTipoProductos, obtenerProductosSegunTipo } = useInicioComponent();
  const { renderCards } = NosotrosComponent();

  return (
    <div className='contenedor-principal'>
      <Header />
      
      <div className="carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.title}
            className={index === currentSlide ? "active" : ""}
          />
        ))}
        <div className="carousel-content">
          <h2>{images[currentSlide].title}</h2>
          <h2>{images[currentSlide].subtitle}</h2>
          <p>{images[currentSlide].description}</p>
          <a href={images[currentSlide].buyLink} className="buy-button">Comprar Ahora</a>
        </div>
      </div>

      <div className='cards-productos'>
        <h1>Productos nuevos</h1>
      </div>

      <div className="new-carousel">
        <Grid container spacing={3}>
          {carrucel2.slice(currentGroup, currentGroup + 4).map((image, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <div className="new-carousel-item">
                <div className='contenedor-imagenes-carrucel'>
                  <img src={image.src} alt={image.title} />
                </div>
                <div className="new-carousel-content">
                  <h2>{image.title}</h2>
                  <h2>{image.subtitle}</h2>
                  <p>{image.description}</p>
                  <a href={image.buyLink} className="buy-button">Comprar Ahora</a>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <div>
          <button className="new-carousel-button prev" onClick={prevGroup}>Prev</button>
          <button className="new-carousel-button next" onClick={nextGroup}>Next</button>
        </div>
      </div>

      <div className='productos-recientes'>
        <h1>Productos más recientes</h1>
      </div>

      <Grid container spacing={3} className="secciones-productos">
        <Grid item xs={3} onClick={() => handleChangeTipoProductos('nuevos')}>
          <div className="titulo-seccion">
            <h1>Nuevo</h1>
          </div>
        </Grid>
        <Grid item xs={3} onClick={() => handleChangeTipoProductos('masVendidos')}>
          <div className="titulo-seccion">
            <h1>Más Vendido</h1>
          </div>
        </Grid>
        <Grid item xs={3} onClick={() => handleChangeTipoProductos('destacados')}>
          <div className="titulo-seccion">
            <h1>Destacado</h1>
          </div>
        </Grid>
        <Grid item xs={3} onClick={() => handleChangeTipoProductos('oferta')}>
          <div className="titulo-seccion">
            <h1>Oferta</h1>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={3} className="productos-container">
        {obtenerProductosSegunTipo().map((producto, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="producto">
              <img src={producto.src} alt={producto.nombre} className='producto-imagen'/>
              <div className="producto-info">
                <h2>{producto.nombre}</h2>
                <p>Precio: ${producto.precio}</p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <div className='contenedor-carrucel'>
        <h1>¡Lo mejor que tenemos para ofrecerte!</h1>
        <div className="card-container">
          {renderCards()}
        </div>
      </div>

      <div className='contenedor-producto'>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <img src={ProductoImage} alt="Producto especial" className="producto-imagen" />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="producto-contenido">
              <h2>Características únicas de los últimos y Productos de tendencia</h2>
              <ul>
                <li><span style={{color: 'blue'}}>Llave inglesa resistente</span> hecha de aleación de acero al carbono</li>
                <li><span style={{color: 'red'}}>Mango antideslizante</span> cubierto con goma para mejor agarre</li>
                <li><span style={{color: 'green'}}>Tamaño ajustable</span> para encajar en varias tuercas y tornillos</li>
              </ul>
              <a href="./" className="buy-button">Comprar Ahora</a>
              <p className="price">$19.99</p>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className='trend-products'>
        <h1>Productos de tendencia</h1>
        <Grid container spacing={3} className='trend-products-container'>
          {[1, 2, 3, 4].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <div className='trend-product'>
                <div className="trend-product-image-wrapper">
                  <img src={Serrucho} alt={`Trend Product ${item}`} className="trend-product-image" />
                </div>
                <div className="producto-info-dos">
                  <h2 className="product-name">Cantilever Chair</h2>
                  <p className="product-price">
                    $26.00 <span className="price-old">$42.00</span>
                  </p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className='contenedor-descuento'>
        <h1>Artículo con descuento</h1>
        <div className='navegacion-productos'>
          <a href='#producto1' className='activo'>Producto 1</a>
          <a href='#producto2'>Producto 2</a>
          <a href='#producto3'>Producto 3</a>
        </div>
        <div className='producto-descuento'>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid xs={12} sm={6} md={4}>
              <div className='info-descuento'>
                <h2>20% de descuento en este producto</h2>
                <h3>Desarmador</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.</p>
                <ul>
                  <li>✔ Material expose like metals</li>
                  <li>✔ Clear lines and geometric figures</li>
                  <li>✔ Simple neutral colours</li>
                  <li>✔ Material expose like metals</li>
                </ul>
                <a href="./" className="buy-button">Comprar Ahora</a>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className='imagen-descuento'>
                <img src={Desarmador} alt="Desarmador" />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className='categorias-principales'>
        <h1>Categorías principales</h1>
        <Grid container spacing={3} className='categorias-container'>
          {[1, 2, 3, 4].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <div className='categoria-item'>
                <div className='categoria-imagen-wrapper'>
                  <img src={CintaMetica} alt={`Categoría ${item}`} className='categoria-imagen' />
                  <div className="categoria-info">
                    <h2 className="categoria-nombre">Mini LCW Chair</h2>
                    <p className="categoria-cantidad">22 Productos</p>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className='productos-recomendados'>
        <h1>Productos recomendados</h1>
        <Grid container spacing={3} className='productos-recomendados-container'>
          {[1, 2, 3, 4].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <div className='producto-recomendado'>
                <div className='producto-recomendado-imagen-wrapper'>
                  <img src={Pinzas} alt={`Recomendado ${item}`} className='producto-recomendado-imagen' />
                </div>
                <div className="producto-info">
                  <h2 className="product-name">Stylish Chair</h2>
                  <p className="product-price">
                    $26.00 <span className="price-old">$42.00</span>
                  </p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="contenedor-fondo">
        <img src={FondoSeguirviendo} alt="Seguir viendo" className="fondo-imagen" />
        <div className="fondo-texto">
          <h1>Seguir viendo</h1>
          <button className="fondo-boton">Ver más</button>
        </div>
      </div>

      <div className="Contenedor-empresas">
        <img src={Empresas} alt="Empresas colaboradoras" className="imagen-empresas" />
      </div>
      
      <Footer />
    </div>
  );
};

export default Inicio;