import React from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Nosotros.css';
import NosotrosIMG from '../IMG/Nosotros.png';
import useNosotrosLogic from '../Components/NosotrosComponente';

const Nosotros: React.FC = () => {
    const { renderCards, currentTestimonial, testimonials } = useNosotrosLogic();

    return (
        <div>
            <Header />
            <div className="nosotros-container">
                <img className="nosotros-img" src={NosotrosIMG} alt="Nosotros" />
                <div className="nosotros-text">
                    <h1>Descubre nuestra ferretería en línea! Calidad y servicio desde hace décadas.</h1>
                    <p>Construyendo desde el pasado, forjando el futuro. Nuestra ferretería es un símbolo de calidad y confianza. Explora nuestro comercio electrónico para descubrir herramientas que impulsan tu creatividad y proyectos hacia adelante.</p>
                    <button className="contact-button">Contactanos</button>
                </div>
            </div>
            <div className='contenedor-carrucel'>
                <h1>Nuestras características</h1>
                <div className="card-container">
                    {renderCards()}
                </div>
            </div>
            <div className='fondo-testimonios'></div>
            <div className='slider-contenedor'>
                <h1>¡Nuestro cliente dice!</h1>
                <div className="testimonial-container">
                    <img src={testimonials[currentTestimonial].image} alt={`Testimonio ${currentTestimonial + 1}`} className="testimonial-img" />
                    <img src={testimonials[(currentTestimonial + 1) % testimonials.length].image} alt={`Testimonio ${currentTestimonial + 2}`} className="testimonial-img middle" style={{marginTop: '-20px'}} />
                    <img src={testimonials[(currentTestimonial + 2) % testimonials.length].image} alt={`Testimonio ${currentTestimonial + 3}`} className="testimonial-img" />
                </div>
                <h2>{testimonials[currentTestimonial].name}</h2>
                <p>{testimonials[currentTestimonial].position}</p>
                <h3>{testimonials[currentTestimonial].text}</h3>
            </div>
            <Footer />
        </div>
    );
}

export default Nosotros;
