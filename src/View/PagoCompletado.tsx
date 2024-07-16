import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/PagoCompletado.css';
import reloj from '../IMG/clock.png';
import check from '../IMG/check.png';
import checklist from '../IMG/checklist.png';
import Header from "./HeaderView";
import Footer from "./FooterView";
import Confetti from 'react-confetti';

function PagoCompletadoView() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleContinueShopping = () => {
        navigate('/');
    };

    useEffect(() => {
        const loadContent = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
            setShowConfetti(true);

            // Delay adding the fade-in class to ensure smooth transition
            setTimeout(() => {
                setShowContent(true);
            }, 100);
        };

        loadContent();
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
        <>
            <Header />
            {showConfetti && <Confetti />}
            <div className="pago-completado-contenedor">
                <div className="icono-wrapper1">
                    <img src={reloj} alt="Clock Icon" className="icono" />
                </div>
                <div className={`contenido-wrapper ${showContent ? 'fade-in' : ''}`}>
                    <div className="check-icono-wrapper">
                        <img src={check} alt="Check Icon" className="check-icono" />
                    </div>
                    <div className="titulo">¡Tu pedido está completado!</div>
                    <div className="mensaje">
                        ¡Gracias por tu pedido! Tu pedido está siendo procesado y se completará dentro de 3-6 horas.
                        Recibirás una confirmación por correo electrónico cuando tu pedido esté completado.
                    </div>
                    <div className="boton-wrapper">
                        <button onClick={handleContinueShopping} className="boton-continuar-comprando">
                            Ir al inicio
                        </button>
                    </div>
                </div>
                <div className="icono-wrapper3">
                    <img src={checklist} alt="List Icon" className="icono" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PagoCompletadoView;
