import React from 'react';
import '../Css/Login.css';

const Register = () => {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Registro</h2>
                <h3>Se parte de nuestra comunidad Ferrushop</h3>
                <div className="form-group">
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Nombre"
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Correo Electrónico"
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder="Contraseña"
                        required 
                    />
                </div>
                <h3>¿Olvidaste tu contraseña? Haz clic <a href="hola">aquí</a></h3>
                <button type="submit" className="login-button">Registrarse</button>
                <h3>Ya tienes cuenta?  Haz click <a href="hola">aquí</a></h3>
            </form>
        </div>
    );
};

export default Register;
