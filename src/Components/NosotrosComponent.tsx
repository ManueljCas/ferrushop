import React, { useState, useEffect } from 'react';
import '../Css/Nosotros.css';
import atencionPersonalizada from '../IMG/atencion-personalizada.png';
import CalidadSuperior from '../IMG/calidad-superior.png';
import EnvioRapido from '../IMG/envio-rapido.png';
import PreciosCompetitivos from '../IMG/precios-competitivos.png';
import Testimonio1 from '../IMG/Testimonio.png';


interface Testimonial {
    image: string;
    name: string;
    position: string;
    text: string;
}

const useNosotrosLogic = () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

    const cardData = [
        { image: CalidadSuperior, title: 'Calidad Superior', description: 'Herramientas de alta calidad para tus proyectos.' },
        { image: EnvioRapido, title: 'Envío Rápido', description: 'Entrega rápida y segura en todo el país.' },
        { image: atencionPersonalizada, title: 'Atención Personalizada', description: 'Soporte al cliente disponible 24/7.' },
        { image: PreciosCompetitivos, title: 'Precios Competitivos', description: 'Los mejores precios en todas nuestras herramientas.' }
    ];

    const testimonials: Testimonial[] = [
        {
            image: Testimonio1,
            name: 'Selina Gomez',
            position: 'Ceo At Webecy Digital',
            text: '"FerruShop ofrece una amplia gama de herramientas de alta calidad. Su plataforma fácil de usar y el servicio al cliente excepcional hacen que comprar sea una experiencia sin complicaciones."'
        },
        {
            image: Testimonio1,
            name: 'John Doe',
            position: 'Marketing Specialist',
            text: '"¡FerruShop es mi destino número uno para todas mis necesidades de herramientas! Su sitio web bien organizado y la entrega rápida hacen que sea mi elección preferida una y otra vez."'
        },
        {
            image: Testimonio1,
            name: 'Jane Smith',
            position: 'Product Manager',
            text: '"Impresionado con la variedad de productos de FerruShop y la atención al detalle en cada compra. ¡Altamente recomendado para cualquier entusiasta del bricolaje o profesional!"'
        }
    ];

    const handleCardClick = (index: number) => {
        setSelectedCardIndex(index);
    };

    const renderCards = () => {
        return cardData.map((card, index) => (
            <div key={index} className={`card ${index === selectedCardIndex ? 'selected' : ''}`} onClick={() => handleCardClick(index)}>
                <img src={card.image} alt={card.title} className="card-img" />
                <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                </div>
            </div>
        ));
    };

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return { renderCards, currentTestimonial, testimonials };
};

export default useNosotrosLogic;
