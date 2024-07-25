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
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      const googleButton = document.getElementById('googleSignInButton');
      if (window.google && googleButton) {
        console.log("Google API loaded, initializing...");
        window.google.accounts.id.initialize({
          client_id: '136405474817-3coi3o0eaf3q35daj451u2klms4c6c8o.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
        });
        window.google.accounts.id.renderButton(
          googleButton,
          { theme: 'outline', size: 'large' }
        );
        console.log("Google Sign-In button rendered.");
      } else {
        console.error('Google API script not loaded or button container not found');
      }
    };

    if (typeof window.google !== 'undefined') {
      initializeGoogleSignIn();
    } else {
      window.addEventListener('load', initializeGoogleSignIn);
    }

    return () => {
      window.removeEventListener('load', initializeGoogleSignIn);
    };
  }, []);

  const handleGoogleSignIn = async (response: google.accounts.id.CredentialResponse) => {
    const idToken = response.credential;
    console.log("Google Sign-In callback, token received:", idToken);

    try {
      const userProfileResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      const userProfile = await userProfileResponse.json();

      const userEmail = userProfile.email;

      const googleLoginResponse = await fetch('https://localhost:7271/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, password: 'defaultPassword', captchaToken: idToken })
      });

      if (googleLoginResponse.ok) {
        const data = await googleLoginResponse.json();
        toast.success('Inicio de sesión con Google exitoso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        login(userEmail, data.userId, 'usuario'); // Inicia sesión con rol de usuario
        navigate('/');
      } else {
        const errorData = await googleLoginResponse.json();
        toast.error(errorData.message || 'Error en el inicio de sesión con Google', {
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
      toast.error('Error en la conexión con Google', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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
        login(email, data.userId, 'usuario'); // Inicia sesión con rol de usuario
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

  return (
    <div className='contededor-login'>
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
                  <button type="submit" className="login-button">Iniciar Sesión</button>
                  <div id="googleSignInButton" className='google-button'></div>
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
