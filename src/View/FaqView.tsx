import React, { useState, useEffect } from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Faq.css';
import FAQComponent from '../Components/FaqComponents';
import Grid from '@material-ui/core/Grid';

const FAQ: React.FC = () => {
    const { renderQuestions } = FAQComponent();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simula una carga inicial
        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        });
        const result = await response.json();
        if (result.success) {
            setStatus('Mensaje enviado exitosamente!');
        } else {
            setStatus('Hubo un problema enviando tu mensaje. Por favor, intenta de nuevo.');
        }
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
        <div>
            <Header />
            <div className="faq-container">
                <div className="faq-text">
                    <h1>Preguntas Frecuentes</h1>
                    <p>Encuentra respuestas a las preguntas más comunes sobre nuestra ferretería, productos y servicios. Si no encuentras lo que buscas, no dudes en contactarnos.</p>
                </div>
            </div>
            <Grid container className="content-container" spacing={3}>
                <Grid item xs={12} md={6} className="faq-content">
                    <h1>Nuestras Preguntas Frecuentes</h1>
                    <div className="question-container">
                        {renderQuestions()}
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className="contact-form-container">
                    <h1>Contacto</h1>
                    <h2>Por favor ingrese los datos que se solicitan.</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div>
                            <label>Nombre:</label>
                            <input type="text" placeholder='Agrega tu nombre completo' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Mensaje:</label>
                            <textarea value={message} placeholder='Agrega tu mensaje' onChange={(e) => setMessage(e.target.value)} required />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                    {status && <p>{status}</p>}
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
}

export default FAQ;
