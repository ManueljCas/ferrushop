import React from 'react';
import Login from './View/LoginView';
import Nosotros from './View/NosotrosView'
import Inicio from './View/InicioView';
import RecuperarContrasena from './View/RecuperarContrasenaView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './View/RegisterView';




function App() {
    return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
        <Route path="/inicio" element={<Inicio />} />

        </Routes>
    </Router>
    );
}

export default App;