import React from 'react';
import '../Css/Login.css';
import Grid from '@material-ui/core/Grid';

const RecuperarContrasena = () => {
  return (
    <div className='bodyy'>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <div className="login-container">
            <form className="login-form">
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
              <h3>¿Ya tienes cuenta? Haz clic <a href="/">aquí</a></h3>
              <button type="submit" className="login-button">Recuperar contraseña</button>
              <h3>¿No tienes una cuenta? Haz clic <a href="/registro">aquí</a></h3>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecuperarContrasena;
