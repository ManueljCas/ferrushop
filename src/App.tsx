import React from 'react';
import Login from './View/LoginView';
import Nosotros from './View/NosotrosView'
import Inicio from './View/InicioView';
import AgregarProducto from './View/AgregarProductoView';
import RecuperarContrasena from './View/RecuperarContrasenaView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './View/RegisterView';
import AppComponent from './Components/AppComponent';
import OrdenCompleta from './Components/OrdenCompleta';





function App() {
    const encodedPath = AppComponent();

    return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/completa" element={<OrdenCompleta />} />
        <Route path={`/${encodedPath}`} element={<AgregarProducto />} />


        </Routes>
    </Router>
    );
}

export default App;