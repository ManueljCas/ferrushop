import React, { useState, useEffect } from 'react';
import '../Css/Inicio.css';
import Grid from '@material-ui/core/Grid';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Header from './HeaderView';
import Footer from './FooterView';
import { Link } from 'react-router-dom';
import seguirviendo from '../IMG/FondoSeguirviendo.png';
import Empresa from '../IMG/Empresas.png';
import Banner1 from '../IMG/Banner1.png';
import Banner2 from '../IMG/Banner2.png';
import Banner3 from '../IMG/Banner3.png';
import Taladro from '../IMG/Taladro.png';
import Sierra from '../IMG/Sierra.png';

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
            src: Banner1,
            title: 'Serrucho de mano',
            subtitle: 'Ideal para carpintería y bricolaje',
            description: 'Serrucho de mano con mango de madera, perfecto para cortes precisos en madera y otros materiales.',
            buyLink: 'producto/3'
        },
        {
            src: Banner2,
            title: 'Martillo de mango de madera',
            subtitle: 'Resistente y duradero',
            description: 'Martillo con mango de madera, ideal para todo tipo de trabajos de construcción y reparación.',
            buyLink: 'producto/2'
        },
        {
            src: Banner3,
            title: 'Desarmador',
            subtitle: 'Precisión y comodidad',
            description: 'Desarmador de precisión con mango ergonómico, adecuado para una amplia variedad de tornillos.',
            buyLink: 'producto/1007'
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

    

   

    const nextGroup = () => {
        setCurrentGroup((prevGroup) => (prevGroup + 4) % productos.length);
    };

    const prevGroup = () => {
        setCurrentGroup((prevGroup) => (prevGroup - 4 + productos.length) % productos.length);
    };

    if (loading) {
        return (
            <div className="producto-loading-screen">
                <div className="producto-loading-spinner"></div>
                <p className="producto-loading-text">Cargando...</p>
            </div>
        );
    }

    return (
        <div className='inicio-contenedor-principal'>
            <Header />
            <div className="inicio-carousel">
    <img
        src={images[currentSlide].src}
        alt={images[currentSlide].title}
        className="inicio-carousel-active"
    />
    <div className="inicio-carousel-content">
        <h1>{images[currentSlide].title.length > 15 ? images[currentSlide].title.slice(0, 15 ) + '...' : images[currentSlide].title}</h1>
        <h2>{images[currentSlide].subtitle.length > 20 ? images[currentSlide].subtitle.slice(0, 20) + '...' : images[currentSlide].subtitle}</h2>
        <p>{images[currentSlide].description.length > 80 ? images[currentSlide].description.slice(0, 80) + '...' : images[currentSlide].description}</p>
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
                        <h2>{producto.title.length > 20 ? producto.title.slice(0, 20) + '...' : producto.title}</h2>
                        <p>{producto.description.length > 30 ? producto.description.slice(0, 30) + '...' : producto.description}</p>
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


            



            <div className='inicio-contenedor-producto'>
            <img src={Taladro} alt="Taladro de Percusión" className="inicio-producto-imagen-inicio-dos" />
            <div className="inicio-producto-contenido">
                <h2>Características únicas de los últimos y Productos de tendencia</h2>
                <ul>
                    <li><span style={{ color: 'blue' }}>Taladro de Percusión</span> con motor de alta potencia</li>
                    <li><span style={{ color: 'red' }}>Mango ergonómico</span> para un mejor control y comodidad</li>
                    <li><span style={{ color: 'green' }}>Velocidad variable</span> para diferentes aplicaciones</li>
                </ul>
                <a href="producto/1005" className="inicio-buy-button">Comprar Ahora</a>
                <p className="inicio-price">$1500</p>
            </div>
            </div>


<div className='inicio-trend-products'>
            <h1>Productos de tendencia</h1>
            <Grid container spacing={3} className='inicio-trend-products-container'>
                {productos.slice(0, 4).map((producto, index) => (
                    <Grid item xs={12} sm={6} md={2} key={index}>
                        <Link to={`/producto/${producto.id}`} className='inicio-trend-product-link'>
                            <div className='inicio-trend-product'>
                                <div className="inicio-trend-product-image-wrapper">
                                    {producto.images[0]?.data && (
                                        <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={`Trend Product ${producto.title}`} className="inicio-trend-product-image" />
                                    )}
                                </div>
                                <div className="inicio-producto-info-dos">
                                    <h2 className="inicio-product-name">{producto.title.length > 20 ? producto.title.slice(0, 20) + '...' : producto.title}</h2>
                                    <p className="inicio-product-price">
                                        ${producto.price} <span className="inicio-price-old">$42.00</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>


    <div className='inicio-contenedor-descuento'>
    <h1>¡Artículo con descuento!</h1>
    <div className='inicio-producto-descuento'>
                <div className='inicio-info-descuento'>
                    <h2>20% de descuento en este producto</h2>
                    <h3>Sierra Circular Bosch GKS 190 Professional</h3>
                    <ul>
                        <li>✔ Potente motor de 1400 W</li>
                        <li>✔ Profundidad de corte de hasta 70 mm</li>
                        <li>✔ Diseño ergonómico para un uso cómodo</li>
                        <li>✔ Compatible con una variedad de hojas de sierra</li>
                    </ul>
                    <a href="producto/1006" className="inicio-buy-button">Comprar Ahora</a>
                </div>
            <Grid item xs={12} sm={6} md={3}>
                <div className='inicio-imagen-descuento'>
                    <img src={Sierra} alt="Sierra Circular Bosch GKS 190" />
                </div>
        </Grid>
    </div>
</div>


<div className='inicio-categorias-principales'>
    <h1>Categorías principales</h1>
    <Grid container spacing={3} className='inicio-categorias-container'>
        {productos.slice(0, 4).map((producto, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
                <Link to={`/producto/${producto.id}`} className='inicio-product-link'>
                    <div className='inicio-categoria-item'>
                        <div className='inicio-categoria-imagen-wrapper inicio-product-hover'>
                            {producto.images[0]?.data && (
                                <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={`Categoría ${producto.title}`} className='inicio-categoria-imagen' />
                            )}
                            <div className="inicio-categoria-info">
                                <h2 className="inicio-categoria-nombre">
                                    {producto.title.length > 10 ? producto.title.slice(0, 10) + '...' : producto.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>
            </Grid>
        ))}
    </Grid>
</div>




<div className='inicio-productos-recomendados'>
    <h1>Productos recomendados</h1>
    <Grid container spacing={3} className='inicio-productos-recomendados-container'>
        {productos.slice(0, 4).map((producto, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
                <Link to={`/producto/${producto.id}`} className='inicio-product-link'>
                    <div className='inicio-producto-recomendado inicio-product-hover'>
                        <div className='inicio-producto-recomendado-imagen-wrapper'>
                            {producto.images[0]?.data && (
                                <img src={`data:image/png;base64,${producto.images[0]?.data}`} alt={`Recomendado ${producto.title}`} className='inicio-producto-recomendado-imagen' />
                            )}
                        </div>
                        <div className="inicio-producto-info">
                            <h2 className="inicio-product-name">{producto.title.length > 20 ? producto.title.slice(0, 20) + '...' : producto.title}</h2>
                            <p className="inicio-product-price">
                                ${producto.price} <span className="inicio-price-old">$42.00</span>
                            </p>
                        </div>
                    </div>
                </Link>
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
