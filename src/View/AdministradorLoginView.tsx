import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css';
import Admin from '../Components/AdministradorComponen';

const AdministradorLogin = () => {
  // Estado para almacenar el correo electrónico y la contraseña del usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el indicador de carga
  const navigate = useNavigate(); // Hook de navegación para redirigir a diferentes rutas
  const AdminView = Admin(); // Componente de vista del administrador

  // Manejador del evento de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de envío del formulario
    setLoading(true); // Muestra el indicador de carga

    try {
      // Realiza una solicitud POST al endpoint de inicio de sesión
      const response = await fetch('https://localhost:7271/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Envía los datos del formulario en formato JSON
      });

      // Manejo de la respuesta de la solicitud
      if (response.ok) {
        // Muestra una notificación de éxito si el inicio de sesión es exitoso
        toast.success('Inicio de sesión exitoso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate(`/${AdminView}`); // Redirige a la vista de administrador
      } else {
        // Muestra un mensaje de error si las credenciales son incorrectas
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
      // Muestra un mensaje de error si hay un problema con la conexión
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
      setLoading(false); // Oculta el indicador de carga al finalizar
    }
  };

  return (
    <div className='bodyy'>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Administrador</h2>
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
              {loading ? (
                // Muestra un indicador de carga si se está realizando la solicitud de inicio de sesión
                <div className="loading-container">
                  <CircularProgress />
                </div>
              ) : (
                // Muestra el botón de envío si no hay una solicitud en curso
                <button type="submit" className="login-button">Iniciar Sesión</button>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdministradorLogin;
