import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../Css/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Inicio de sesión exitoso');
      window.location.href = './inicio';
    } catch (error) {
      setError('Error al iniciar sesión: ' + (error as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Inicio de sesión con Google exitoso');
      window.location.href = './inicio';
    } catch (error) {
      setError('Error al iniciar sesión con Google: ' + (error as Error).message);
    }
  };

  return (
    <div className='bodyy'>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Inicio de Sesión</h2>
          <h3>Bienvenido a Ferrushop</h3>
          <div className="form-group">
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="Correo Electrónico"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              name="password"
              placeholder="Contraseña"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h3>¿Haz olvidado tu contraseña? Haz clic <a href="/recuperarContrasena">aquí</a></h3>
          <a href="./inicio">ir a inicio</a>
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <button type="button" className="login-button" onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>
          {error && <p className="error">{error}</p>}
          <h3>¿No tienes una cuenta? Haz clic <a href="/registro">aquí</a></h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
