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
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Inicio: React.FC = () => {
    const { currentSlide, images, currentGroup, carrucel2, nextGroup, prevGroup, handleChangeTipoProductos, obtenerProductosSegunTipo } = useInicioComponent();
    const { renderCards } = NosotrosComponent();
    const { currentUser } = useAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            alert('Sesión cerrada');
            window.location.href = '/';
        }).catch((error) => {
            console.error('Error al cerrar sesión', error);
        });
    };

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

            <div className='contenedor-carrucel'>
                <h1>¡Lo mejor que tenemos para ofrecerte!</h1>
                <div className="card-container">
                    {renderCards()}
                </div>
            </div>

            <div className='contenedor-producto'>
                <img src={ProductoImage} alt="Producto especial" className="producto-imagen" />
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
            </div>

            {/* Sección de Productos de tendencia */}
            <div className='trend-products'>
                <h1>Productos de tendencia</h1>
                <div className='trend-products-container'>
                    {[1, 2, 3, 4].map((item, index) => (
                        <div key={index} className='trend-product'>
                            <div className="trend-product-image-wrapper">
                                <img src={Serrucho} alt={`Trend Product ${item}`} className="trend-product-image" />
                            </div>
                            <div className="producto-info">
                                <h2 className="product-name">Cantilever Chair</h2>
                                <p className="product-price">
                                    $26.00 <span className="price-old">$42.00</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='contenedor-descuento'>
                <h1>Artículo con descuento</h1>
                <div className='navegacion-productos'>
                    <a href='#producto1' className='activo'>Producto 1</a>
                    <a href='#producto2'>Producto 2</a>
                    <a href='#producto3'>Producto 3</a>
                </div>
                <div className='producto-descuento'>
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
                    <div className='imagen-descuento'>
                        <img src={Desarmador} alt="Desarmador" />
                    </div>
                </div>
            </div>

            {/* Nueva Sección de Categorías Principales */}
            <div className='categorias-principales'>
                <h1>Categorías principales</h1>
                <div className='categorias-container'>
                    {[1, 2, 3, 4].map((item, index) => (
                        <div key={index} className='categoria-item'>
                            <div className='categoria-imagen-wrapper'>
                                <img src={CintaMetica} alt={`Categoría ${item}`} className='categoria-imagen' />
                                <div className="categoria-info">
                                    <h2 className="categoria-nombre">Mini LCW Chair</h2>
                                    <p className="categoria-precio">$56.00</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='categorias-paginacion'>
                    <span className='paginacion-activa'></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className='lista-productos'>
                <h1>Categorías principales</h1>
                <div className='lista-productos-container'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className='lista-producto-item'>
                            <div className="lista-producto-imagen-wrapper">
                                <img src={Pinzas} alt={`Lista Producto ${item}`} className="lista-producto-imagen" />
                            </div>
                            <div className="producto-info">
                                <h2 className="product-name">Product Name</h2>
                                <p className="product-price">
                                    $20.00 <span className="price-old">$30.00</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='contenedor-fondo'>
                <img src={FondoSeguirviendo} alt="FondoSeguirViendo" className="fondo-imagen" />
                <div className='fondo-texto'>
                    <h1>¿Aún no te has decidido?</h1>
                    <button className='fondo-boton'>Seguir viendo</button>
                </div>
            </div>

            <div className='Contenedor-empresas'>
                <img src={Empresas} alt="FondoSeguirViendo" className="Empresa" />
            </div>

            {currentUser && (
                <div className="logout-section">
                    <button onClick={handleSignOut}>Cerrar Sesión</button>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Inicio;
