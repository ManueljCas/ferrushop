import React, { useState, useEffect } from 'react';
import '../Css/Inicio.css';
import Grid from '@material-ui/core/Grid';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Header from './HeaderView';
import Footer from './FooterView';
import promotional from '../IMG/promotional.png';
import seguirviendo from '../IMG/FondoSeguirviendo.png';
import Empresa from '../IMG/Empresas.png';

interface ImageModel {
    data: ArrayBuffer;
    preview: string;
}

interface ProductModel {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    fullDescription: string;
    details: string;
    quantity: number;
    images: ImageModel[];
}

const InicioView: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentGroup, setCurrentGroup] = useState(0);
    const [tipoProductos, setTipoProductos] = useState<string>('nuevos');
    const [productos, setProductos] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://localhost:7271/api/Products');
                const data = await response.json();
                setProductos(data);
                setLoading(false); // Cuando los productos se han cargado
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProductos();
    }, []);

    const images = [
        {
            src: promotional,
            title: 'Nueva colección de herramientas',
            subtitle: 'Tendencias en 2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
            buyLink: 'https://example.com/comprar1'
        },
        {
            src: promotional,
            title: 'Nueva colección de herramientas',
            subtitle: 'Tendencias en 2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
            buyLink: 'https://example.com/comprar1'
        },
        {
            src: promotional,
            title: 'Nueva colección de herramientas',
            subtitle: 'Tendencias en 2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
            buyLink: 'https://example.com/comprar1'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const handleChangeTipoProductos = (tipo: string) => {
        setTipoProductos(tipo);
    };

    const obtenerProductosSegunTipo = () => {
        return productos.filter(producto => producto.category === tipoProductos);
    };

    const nextGroup = () => {
        setCurrentGroup((prevGroup) => (prevGroup + 4) % productos.length);
    };

    const prevGroup = () => {
        setCurrentGroup((prevGroup) => (prevGroup - 4 + productos.length) % productos.length);
    };

    if (loading) {
        return (
            <div className="inicio-loading-screen">
                <div className="inicio-loading-spinner"></div>
                <p className="inicio-loading-text">Cargando...</p>
            </div>
        );
    }

    return (
        <div className='inicio-contenedor-principal'>
            <Header />
            <div className="inicio-carousel">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.title}
                        className={index === currentSlide ? "inicio-carousel-active" : ""}
                    />
                ))}
                <div className="inicio-carousel-content">
                    <h2>{images[currentSlide].title}</h2>
                    <h2>{images[currentSlide].subtitle}</h2>
                    <p>{images[currentSlide].description}</p>
                    <a href={images[currentSlide].buyLink} className="inicio-buy-button">Comprar Ahora</a>
                </div>
            </div>

            <div className='inicio-cards-productos'>
                <h1>Productos nuevos</h1>
            </div>

            <div className="inicio-new-carousel">
                <Grid container spacing={3}>
                    {productos.slice(currentGroup, currentGroup + 4).map((producto, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <div className="inicio-new-carousel-item">
                                <div className='inicio-contenedor-imagenes-carrucel'>
                                    {producto.images[0]?.data && (
                                        <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={producto.title} className='inicio-contenedor-imagenes-carrucel-img'/>
                                    )}
                                </div>
                                <div className="inicio-new-carousel-content">
                                    <h2>{producto.title}</h2>
                                    <p>{producto.description}</p>
                                    <a href={`./producto/${producto.id}`} className="inicio-buy-button">Comprar Ahora</a>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div>
                    <button className="inicio-new-carousel-button prev" onClick={prevGroup}><AiOutlineArrowLeft /></button>
                    <button className="inicio-new-carousel-button next" onClick={nextGroup}><AiOutlineArrowRight /></button>
                </div>
            </div>

            <div className='inicio-productos-recientes'>
                <h1>Productos más recientes</h1>
            </div>

            <Grid container spacing={3} className="inicio-secciones-productos">
                <Grid item xs={3} onClick={() => handleChangeTipoProductos('nuevos')}>
                    <div className="inicio-titulo-seccion">
                        <h1>Nuevo</h1>
                    </div>
                </Grid>
                <Grid item xs={3} onClick={() => handleChangeTipoProductos('masVendidos')}>
                    <div className="inicio-titulo-seccion">
                        <h1>Más Vendido</h1>
                    </div>
                </Grid>
                <Grid item xs={3} onClick={() => handleChangeTipoProductos('destacados')}>
                    <div className="inicio-titulo-seccion">
                        <h1>Destacado</h1>
                    </div>
                </Grid>
                <Grid item xs={3} onClick={() => handleChangeTipoProductos('oferta')}>
                    <div className="inicio-titulo-seccion">
                        <h1>Oferta</h1>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3} className="inicio-productos-container">
                {obtenerProductosSegunTipo().map((producto, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <div className="inicio-producto">
                            {producto.images[0]?.data && (
                                <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={producto.title} className='inicio-producto-imagen-inicio' />
                            )}
                            <div className="inicio-producto-info">
                                <h2>{producto.title}</h2>
                                <p>Precio: ${producto.price}</p>
                                <a href={`./producto/${producto.id}`} className="inicio-buy-button">Comprar Ahora</a>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>

            <div className='inicio-contenedor-producto'>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img src="https://example.com/special-product.jpg" alt="Producto especial" className="inicio-producto-imagen-inicio-dos" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="inicio-producto-contenido">
                            <h2>Características únicas de los últimos y Productos de tendencia</h2>
                            <ul>
                                <li><span style={{ color: 'blue' }}>Llave inglesa resistente</span> hecha de aleación de acero al carbono</li>
                                <li><span style={{ color: 'red' }}>Mango antideslizante</span> cubierto con goma para mejor agarre</li>
                                <li><span style={{ color: 'green' }}>Tamaño ajustable</span> para encajar en varias tuercas y tornillos</li>
                            </ul>
                            <a href="./" className="inicio-buy-button">Comprar Ahora</a>
                            <p className="inicio-price">$19.99</p>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className='inicio-trend-products'>
                <h1>Productos de tendencia</h1>
                <Grid container spacing={3} className='inicio-trend-products-container'>
                    {productos.slice(0, 4).map((producto, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index}>
                            <div className='inicio-trend-product'>
                                <div className="inicio-trend-product-image-wrapper">
                                    {producto.images[0]?.data && (
                                        <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={`Trend Product ${producto.title}`} className="inicio-trend-product-image" />
                                    )}
                                </div>
                                <div className="inicio-producto-info-dos">
                                    <h2 className="inicio-product-name">{producto.title}</h2>
                                    <p className="inicio-product-price">
                                        ${producto.price} <span className="inicio-price-old">$42.00</span>
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div className='inicio-contenedor-descuento'>
                <h1>¡Artículo con descuento!</h1>
                <div className='inicio-producto-descuento'>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <div className='inicio-info-descuento'>
                                <h2>20% de descuento en este producto</h2>
                                <h3>Desarmador</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.</p>
                                <ul>
                                    <li>✔ Material expose like metals</li>
                                    <li>✔ Clear lines and geometric figures</li>
                                    <li>✔ Simple neutral colours</li>
                                    <li>✔ Material expose like metals</li>
                                </ul>
                                <a href="./" className="inicio-buy-button">Comprar Ahora</a>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className='inicio-imagen-descuento'>
                                <img src="https://example.com/desarmador.jpg" alt="Desarmador" />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div className='inicio-categorias-principales'>
                <h1>Categorías principales</h1>
                <Grid container spacing={3} className='inicio-categorias-container'>
                    {productos.slice(0, 4).map((producto, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index}>
                            <div className='inicio-categoria-item'>
                                <div className='inicio-categoria-imagen-wrapper'>
                                    {producto.images[0]?.data && (
                                        <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={`Categoría ${producto.title}`} className='inicio-categoria-imagen' />
                                    )}
                                    <div className="inicio-categoria-info">
                                        <h2 className="inicio-categoria-nombre">{producto.title}</h2>
                                        <p className="inicio-categoria-cantidad">22 Productos</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div className='inicio-productos-recomendados'>
                <h1>Productos recomendados</h1>
                <Grid container spacing={10} className='inicio-productos-recomendados-container'>
                    {productos.slice(0, 4).map((producto, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index}>
                            <div className='inicio-producto-recomendado'>
                                <div className='inicio-producto-recomendado-imagen-wrapper'>
                                    {producto.images[0]?.data && (
                                        <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={`Recomendado ${producto.title}`} className='inicio-producto-recomendado-imagen' />
                                    )}
                                </div>
                                <div className="inicio-producto-info">
                                    <h2 className="inicio-product-name">{producto.title}</h2>
                                    <p className="inicio-product-price">
                                        ${producto.price} <span className="inicio-price-old">$42.00</span>
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div className="inicio-contenedor-fondo">
                <img src={seguirviendo} alt="Seguir viendo" className="inicio-fondo-imagen" />
                <div className="inicio-fondo-texto">
                    <h1>Seguir viendo</h1>
                    <a href="/producto" className="inicio-buy-button">Haz click aquí</a>
                </div>
            </div>

            <div className="inicio-contenedor-empresas">
                <img src={Empresa} alt="Empresas colaboradoras" className="inicio-imagen-empresas" />
            </div>

            <Footer />
        </div>
    );
};

export default InicioView;
