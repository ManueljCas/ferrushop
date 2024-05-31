import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './View/LoginView';
import Nosotros from './View/NosotrosView';
import Inicio from './View/InicioView';
import AgregarProducto from './View/AgregarProductoView';
import RecuperarContrasena from './View/RecuperarContrasenaView';
import Producto from './View/ProductoView';
import Register from './View/RegisterView';
import AppComponent from './Components/AppComponent';
import OrdenCompleta from './Components/OrdenCompleta';
import Faq from './View/FaqView';
import { AuthProvider } from './context/AuthContext';
import UserProfile from './Components/UserProfile';

function App() {
    const encodedPath = AppComponent();

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Register />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
                    <Route path="/completa" element={<OrdenCompleta />} />
                    <Route path="/producto" element={<Producto />} />
                    <Route path={`/${encodedPath}`} element={<AgregarProducto />} />
                    <Route path="/perfil" element={<UserProfile />} /> {/* Nueva ruta */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
