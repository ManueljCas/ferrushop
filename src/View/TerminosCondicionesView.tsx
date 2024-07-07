import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Header from './HeaderView';
import Footer from './FooterView';
import '../Css/TerminosCondiciones.css';
import { useAuth } from '../Javascript/AuthContext'; // Asegúrate de importar el contexto de autenticación

const TerminosCondiciones = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); // Redirigir si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleBack = () => {
    navigate(-1); // Retrocede en el historial del navegador
  };

  return (
    <>
      <Header />
      <div className="terms-conditions-container">
        <h1 className="terms-title">Bienvenido a Ferrushop</h1>
        <p className="terms-intro">Somos una tienda virtual dedicada a la venta de Herramientas para ferretería y el hogar. Estas políticas, términos y condiciones se aplican a todas las compras realizadas en nuestra tienda virtual. Al hacer una compra, usted acepta estas políticas, términos y condiciones. Si no está de acuerdo con alguna de ellas, no podrá realizar una compra en nuestra tienda.</p>
        <p className="terms-intro">Nos reservamos el derecho de actualizar, modificar o cambiar estas políticas, términos y condiciones en cualquier momento y sin previo aviso. Es responsabilidad del usuario revisar periódicamente estos términos y condiciones para estar al tanto de cualquier cambio.</p>
        
        <div className="terms-cards-container">
          <div className="terms-card">
            <div onClick={() => toggleSection('infoTienda')} className="terms-card-header">
              I. Información de la Tienda {openSections.infoTienda ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.infoTienda && (
              <div className="terms-card-body">
                <p>a. Ferrushop es propiedad de Ferrushop S.A DE C.V, registrada en México. Nuestro número de identificación fiscal es c170090535-7.</p>
                <p>b. La dirección de nuestra tienda virtual es Ferrushop.com.</p>
                <p>c. Si necesita comunicarse con nosotros, puede hacerlo a través de nuestro correo electrónico info@ferrushop.com.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('preciosPagos')} className="terms-card-header">
              II. Precios y Pagos {openSections.preciosPagos ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.preciosPagos && (
              <div className="terms-card-body">
                <p>a. Todos los precios que aparecen en nuestra tienda virtual están en MXN e incluyen el impuesto al valor agregado (IVA).</p>
                <p>b. Aceptamos las siguientes formas de pago: TDC / TDD.</p>
                <p>c. El pago se realizará en el momento de la compra.</p>
                <p>d. Una vez que se haya realizado el pago, se enviará un correo electrónico de confirmación al usuario.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('devolucionesReembolsos')} className="terms-card-header">
              III. Devoluciones y Reembolsos {openSections.devolucionesReembolsos ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.devolucionesReembolsos && (
              <div className="terms-card-body">
                <p>a. Si el usuario no está satisfecho con su compra, puede devolver el producto en un plazo de 7 días hábiles a partir de la fecha de entrega.</p>
                <p>b. El producto debe estar en las mismas condiciones en que fue recibido, sin usar y en su embalaje original.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('propiedadIntelectual')} className="terms-card-header">
              IV. Propiedad Intelectual {openSections.propiedadIntelectual ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.propiedadIntelectual && (
              <div className="terms-card-body">
                <p>a. Todo el contenido de nuestra tienda virtual, incluyendo imágenes, textos y diseños, son propiedad de Ferrushop S.A DE C.V y están protegidos por las leyes de propiedad intelectual.</p>
                <p>b. Queda prohibida la reproducción, distribución, exhibición, transmisión o explotación de cualquier contenido de nuestra tienda virtual sin nuestro permiso expreso por escrito.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('privacidad')} className="terms-card-header">
              V. Privacidad {openSections.privacidad ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.privacidad && (
              <div className="terms-card-body">
                <p>a. Nos comprometemos a proteger la privacidad de nuestros usuarios.</p>
                <p>b. Para obtener más información sobre cómo manejamos su información personal, consulte nuestra Política de Privacidad.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('limitacionResponsabilidad')} className="terms-card-header">
              VI. Limitación de Responsabilidad {openSections.limitacionResponsabilidad ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.limitacionResponsabilidad && (
              <div className="terms-card-body">
                <p>a. No nos hacemos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que pueda resultar del uso o la imposibilidad de uso de nuestra tienda virtual.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('leyAplicable')} className="terms-card-header">
              VII. Ley Aplicable y Jurisdicción {openSections.leyAplicable ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.leyAplicable && (
              <div className="terms-card-body">
                <p>a. Estas políticas, términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país de México, sin dar efecto a ninguna disposición sobre conflicto de leyes.</p>
              </div>
            )}
          </div>

          <div className="terms-card">
            <div onClick={() => toggleSection('disposicionesGenerales')} className="terms-card-header">
              VIII. Disposiciones Generales {openSections.disposicionesGenerales ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {openSections.disposicionesGenerales && (
              <div className="terms-card-body">
                <p>a. Estas políticas, términos y condiciones constituyen el acuerdo completo entre el usuario y Ferrushop con respecto al uso de nuestra tienda virtual y reemplazan cualquier acuerdo previo.</p>
                <p>b. Fecha de última actualización: 06/07/2024</p>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleBack} className="terms-back-button">Volver</button>
      </div>
      <Footer />
    </>
  );
};

export default TerminosCondiciones;
