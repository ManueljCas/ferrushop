import React from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Inicio.css';
import useInicioComponent from '../Components/InicioComponent';

const Inicio = () => {
    const { currentSlide, images, currentGroup, carrucel2, nextGroup, prevGroup, handleChangeTipoProductos, obtenerProductosSegunTipo} = useInicioComponent();

    return (
        <div>
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
                <h1>Productos destacados</h1>
            </div>

            <div className="new-carousel">
                <div className="new-carousel-inner">
                    {carrucel2.slice(currentGroup, currentGroup + 4).map((image, index) => (
                        <div key={index} className="new-carousel-item">
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
                    ))}
                </div>
                <div>
                    <button className="new-carousel-button prev" onClick={prevGroup}>Prev</button>
                    <button className="new-carousel-button next" onClick={nextGroup}>Next</button>
                </div>
            </div>

            <h1>Productos más recientes </h1>

            <div className="secciones-productos">
                <div className="titulo-seccion" onClick={() => handleChangeTipoProductos('nuevos')}>
                    <h1>Nuevo</h1>
                </div>
                <div className="titulo-seccion" onClick={() => handleChangeTipoProductos('masVendidos')}>
                    <h1>Más Vendido</h1>
                </div>
                <div className="titulo-seccion" onClick={() => handleChangeTipoProductos('destacados')}>
                    <h1>Destacado</h1>
                </div>
                <div className="titulo-seccion" onClick={() => handleChangeTipoProductos('oferta')}>
                    <h1>Oferta</h1>
                </div>
            </div>

            <div className="productos-container">
                {obtenerProductosSegunTipo().map((producto, index) => (
                    <div key={index} className="producto">
                        <img src={producto.src} alt={producto.nombre} />
                        <div className="producto-info">
                            <h2>{producto.nombre}</h2>
                            <p>Precio: ${producto.precio}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Inicio;
