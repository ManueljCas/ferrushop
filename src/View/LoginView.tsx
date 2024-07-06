import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css';
import { useAuth } from '../Javascript/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  };

  useEffect(() => {
    const loadContent = async () => {
      await Promise.all([
        loadImage('../IMG/Ferreteria.jpg'),
      ]);
      setIsPageLoading(false);
    };

    loadContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error('Por favor, completa el reCAPTCHA.', {
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
      const response = await fetch('https://localhost:7271/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, captchaToken })
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Inicio de sesión exitoso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        login(email, data.userId); // Asegúrate de pasar el userId aquí
        navigate('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Credenciales incorrectas', {
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

  if (isPageLoading) {
    return (
      <div className="producto-loading-screen">
        <div className="producto-loading-spinner"></div>
        <p className="producto-loading-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div className='bodyy'>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Inicio de Sesión</h2>
              <h3>Bienvenido a Ferrushop</h3>
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
                  <h3>¿Haz olvidado tu contraseña? Haz clic <a href="/recuperarContrasena">aquí</a></h3>
                  <button type="submit" className="login-button">Iniciar Sesión</button>
                  <h3>¿No tienes una cuenta? Haz clic <a href="/registro">aquí</a></h3>
                </>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
