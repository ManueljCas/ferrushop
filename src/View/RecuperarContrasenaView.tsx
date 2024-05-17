import React from 'react';
import '../Css/Login.css';

const RecuperarContrasena = () => {
    return (
        <div className="login-container">
            <form className="login-form" >
                <h2>Recuperar Contraseña</h2>
                <h3>Recupera tu contraseña y sigue con nosotros.</h3>
                <div className="form-group">
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Correo Electrónico"
                        required 
                    />
                </div>
                <h3>¿Ya tienes cuenta? Haz clic <a href="hola">aquí</a></h3>
                <button type="submit" className="login-button">Recuperar contraseña</button>
                <h3>¿No tienes una cuenta? Haz clic <a href="hola">aquí</a></h3>
            </form>
        </div>
    );
};

export default RecuperarContrasena;
