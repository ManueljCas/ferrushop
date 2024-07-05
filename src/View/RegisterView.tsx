import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword || !captchaToken) {
      toast.error('Por favor, completa todos los campos y el reCAPTCHA.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, ingresa un correo electrónico válido.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true);

    try {
      const userExistsResponse = await fetch(`https://localhost:7271/api/usuario/exists?email=${email}`);

      if (userExistsResponse.status === 409) {
        toast.error('El usuario ya existe', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false); 
        return;
      }

      const response = await fetch('https://localhost:7271/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, captchaToken })
      });

      if (response.ok) {
        toast.success('Usuario creado', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login'); // Redirigir al login después del registro exitoso
      } else {
        toast.error('Error en el registro', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Error en la conexión', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className='bodyy'>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Registro</h2>
              <h3>Se parte de nuestra comunidad Ferrushop</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group captcha-container">
                <ReCAPTCHA
                  sitekey="6Lc7zwgqAAAAAK5XcywNJP6UMb2Os-j2eDtNPljf"
                  onChange={onCaptchaChange}
                />
              </div>
              {loading ? (
                <div className="loading-container">
                  <CircularProgress />
                </div>              
                ) : (
                <>
                  <h3>¿Olvidaste tu contraseña? Haz clic <a href="/recuperarContrasena">aquí</a></h3>
                  <button type="submit" className="login-button">Registrarse</button>
                  <h3>¿Ya tienes cuenta? Haz clic <a href="/login">aquí</a></h3>
                </>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
