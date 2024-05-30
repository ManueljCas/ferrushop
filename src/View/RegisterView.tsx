import React from 'react';
import '../Css/Login.css';
import Grid from '@material-ui/core/Grid';

const Register = () => {
  return (
    <div className='bodyy'>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
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
              <h3>¿Olvidaste tu contraseña? Haz clic <a href="/recuperarContrasena">aquí</a></h3>
              <button type="submit" className="login-button">Registrarse</button>
              <h3>Ya tienes cuenta? Haz clic <a href="/">aquí</a></h3>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
