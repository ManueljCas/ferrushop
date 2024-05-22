// src/Components/FAQComponent.js
import React, { useState } from 'react';

const FAQComponent = () => {
    const [questions] = useState([
        {
            question: "¿Cómo realizo un pedido?",
            answer: "Para realizar un pedido, simplemente navega por nuestros productos, agrega los que desees al carrito y sigue las instrucciones para completar la compra."
        },
        {
            question: "¿Cuáles son las opciones de envío?",
            answer: "Ofrecemos varias opciones de envío, incluyendo envío estándar y exprés. Puedes seleccionar la opción que prefieras al finalizar tu compra."
        },
        {
            question: "¿Cómo puedo rastrear mi pedido?",
            answer: "Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento que puedes usar para rastrear tu paquete."
        },
        // Agrega más preguntas y respuestas según sea necesario
    ]);

    const renderQuestions = () => {
        return questions.map((q, index) => (
            <div key={index} className="question-item">
                <h2>{q.question}</h2>
                <p>{q.answer}</p>
            </div>
        ));
    };

    return { renderQuestions };
}

export default FAQComponent;
