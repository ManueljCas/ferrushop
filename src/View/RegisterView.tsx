import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

interface GoogleData {
  name: string;
  email: string;
  idToken: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '136405474817-3coi3o0eaf3q35daj451u2klms4c6c8o.apps.googleusercontent.com',
          callback: handleGoogleSignIn,
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton') as HTMLElement,
          { theme: 'outline', size: 'large' }
        );
      } else {
        console.error('Google API script not loaded');
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
    const userInfo = JSON.parse(atob(idToken.split('.')[1]));
    const email = userInfo.email;
    const name = userInfo.name;

    // Verificar si el usuario ya existe
    try {
      const userExistsResponse = await fetch(`https://localhost:7271/api/usuario/exists?email=${email}`);

      if (userExistsResponse.status === 409) {
        toast.info('Usuario ya registrado. Redirigiendo al login...', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
        return;
      }

      // Si el usuario no existe, procede con el registro
      const googleData: GoogleData = {
        name: name,
        email: email,
        idToken: idToken,
      };
      handleSubmit(undefined, googleData);
    } catch (error) {
      toast.error('Error en la verificación del usuario', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>, googleData?: GoogleData) => {
    if (e) e.preventDefault();

    if (!googleData && (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !captchaToken)) {
      toast.error('Por favor, completa todos los campos y el reCAPTCHA.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!googleData && password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!googleData) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Por favor, ingresa un correo electrónico válido.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }

    setLoading(true);

    try {
      const userExistsResponse = await fetch(`https://localhost:7271/api/usuario/exists?email=${email}`);

      if (userExistsResponse.status === 409) {
        toast.info('Usuario ya registrado. Redirigiendo al login...', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
        setLoading(false);
        return;
      }

      const response = await fetch('https://localhost:7271/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: googleData ? googleData.name : name,
          email: googleData ? googleData.email : email,
          password: googleData ? 'defaultPassword' : password,
          captchaToken: googleData ? 'googleCaptchaToken' : captchaToken,
        }),
      });

      if (response.ok) {
        toast.success('Usuario creado', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
      } else {
        toast.error('Error en el registro', {
          position: 'top-right',
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
        position: 'top-right',
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
                  <button type="submit" className="login-button">Registrarse</button>
                  <div id="googleSignInButton" className='hola'></div>
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
