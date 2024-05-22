// src/Views/FAQ.js
import React, { useState } from 'react';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/Faq.css';
import FAQComponent from '../Components/FaqComponents';

const FAQ: React.FC = () => {
    const { renderQuestions } = FAQComponent();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

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

    return (
        <div>
            <Header />
            <div className="faq-container">
               
                <div className="faq-text">
                    <h1>Preguntas Frecuentes</h1>
                    <p>Encuentra respuestas a las preguntas más comunes sobre nuestra ferretería, productos y servicios. Si no encuentras lo que buscas, no dudes en contactarnos.</p>
                </div>
            </div>
            <div className="content-container">
                <div className="faq-content">
                    <h1>Nuestras Preguntas Frecuentes</h1>
                    <div className="question-container">
                        {renderQuestions()}
                    </div>
                </div>
                <div className="contact-form-container">
                    <h2>Contacto</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div>
                            <label>Nombre:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Mensaje:</label>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FAQ;
