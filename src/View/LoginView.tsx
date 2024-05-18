import React from 'react';
import '../Css/Login.css';

const Login = () => {

    return (
        <div className='bodyy'>
                <div className="login-container">
                    <form className="login-form" >
                        <h2>Inicio de Sesión</h2>
                        <h3>Bienvenido a Ferrushop</h3>
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
                        <h3>¿Haz olvidado tu contraseña? Haz clic <a href="/recuperarContrasena">aquí</a></h3>
                        <a href="./inicio">ir a inicio</a>
                        <button type="submit" className="login-button">Iniciar Sesión</button>
                        <h3>¿No tienes una cuenta? Haz clic <a href="hola">aquí</a></h3>
                    </form>
                </div>
        </div>
    );
};

export default Login;
