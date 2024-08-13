import React, { useState, useEffect } from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Faq.css';
import FAQComponent from '../Components/FaqComponents';
import Container from '@material-ui/core/Container';

const FAQ: React.FC = () => {
    const { renderQuestions } = FAQComponent();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simula una carga inicial
        return () => clearTimeout(timeout);
    }, []);


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
            <div className="faq-container">
                <div className="faq-text">
                    <h1>Preguntas Frecuentes</h1>
                    <p>Encuentra respuestas a las preguntas más comunes sobre nuestra ferretería, productos y servicios. Si no encuentras lo que buscas, no dudes en contactarnos.</p>
                </div>
            </div>
            <Container>
                <div className="content-container">
                    <div className="faq-content">
                        <h1>Nuestras Preguntas Frecuentes.</h1>
                        <div className="question-container">
                            {renderQuestions()}
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default FAQ;
