import React from 'react';
import '../Css/Login.css';
import Grid from '@material-ui/core/Grid';

const Login = () => {
  return (
    <div className='bodyy'>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <div className="login-container">
            <form className="login-form">
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
              <h3>¿No tienes una cuenta? Haz clic <a href="/registro">aquí</a></h3>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
