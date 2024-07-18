import React, { useState, useEffect } from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Nosotros.css';
import NosotrosIMG from '../IMG/Nosotros.png';
import NosotrosComponent from '../Components/NosotrosComponent';
import Grid from '@material-ui/core/Grid';
import { useNavigate } from 'react-router-dom';

const Nosotros = () => {
  const navigate = useNavigate();

  const { renderCards, currentTestimonial, testimonials } = NosotrosComponent();
  const [loading, setLoading] = useState(true);

  const hola = () => {
    navigate('/contacto');
  };


  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  };

  useEffect(() => {
    const loadContent = async () => {
      // Simula la carga de contenido
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Ajusta el tiempo según tus necesidades
      await loadImage(NosotrosIMG);
      await Promise.all(testimonials.map(testimonial => loadImage(testimonial.image)));
      setLoading(false);
    };

    loadContent();
  }, [testimonials]);

  if (loading) {
    return (
      <div className="producto-loading-screen">
        <div className="producto-loading-spinner"></div>
        <p className="producto-loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Grid container className="nosotros-container" spacing={4}>
        <Grid item xs={12} md={6}>
          <img className="nosotros-img" src={NosotrosIMG} alt="Nosotros" />
        </Grid>
        <Grid item xs={12} md={6} className="nosotros-text">
          <h1>Descubre nuestra ferretería en línea! Calidad y servicio desde hace décadas.</h1>
          <p>Construyendo desde el pasado, forjando el futuro. Nuestra ferretería es un símbolo de calidad y confianza. Explora nuestro comercio electrónico para descubrir herramientas que impulsan tu creatividad y proyectos hacia adelante.</p>
          <button className="contact-button" onClick={hola}>Contactanos</button>
        </Grid>
      </Grid>
      <div className='contenedor-carrucel'>
        <h1>Nuestras características</h1>
        <div className="card-container">
          {renderCards()}
        </div>
      </div>
      <div className='fondo-testimonios'>
        <div className='slider-contenedor'>
          <h1>¡Nuestro cliente dice!</h1>
          <div className="testimonial-container">
            <img src={testimonials[currentTestimonial].image} alt={`Testimonio ${currentTestimonial + 1}`} className="testimonial-img" />
            <img src={testimonials[(currentTestimonial + 1) % testimonials.length].image} alt={`Testimonio ${currentTestimonial + 2}`} className="testimonial-img middle" style={{ marginTop: '-20px' }} />
            <img src={testimonials[(currentTestimonial + 2) % testimonials.length].image} alt={`Testimonio ${currentTestimonial + 3}`} className="testimonial-img" />
          </div>
          <h2>{testimonials[currentTestimonial].name}</h2>
          <p>{testimonials[currentTestimonial].position}</p>
          <h3>{testimonials[currentTestimonial].text}</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Nosotros;
