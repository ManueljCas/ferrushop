import React from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Nosotros.css'; // Importa el archivo CSS para los estilos
import Nosotros from '../IMG/Nosotros.png'; // Importa la imagen

const Inicio = () => {
    return (
        <div>
            <Header/>
            <div className="nosotros-container">
                <img className="nosotros-img" src={Nosotros} alt="Nosotros" /> 
                <div className="nosotros-text">
                    <h1>Descubre nuestra ferretería en línea! Calidad y servicio desde hace décadas.</h1>
                    <p>Construyendo desde el pasado, forjando el futuro. Nuestra ferretería es un símbolo de calidad y confianza. Explora nuestro comercio electrónico para descubrir herramientas que impulsan tu creatividad y proyectos hacia adelante.</p>
                    <button className="contact-button">Contactanos</button>
                </div>
            </div>
            <div>
                <h1>Nuestras características</h1>
            </div>
            <Footer/>
        </div>
    );
};

export default Inicio;
