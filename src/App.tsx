import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { urlFerrushop } from './endpoints';

import Login from './View/LoginView';
import Nosotros from './View/NosotrosView';
import Inicio from './View/InicioView';
import AgregarProducto from './View/AgregarProductoView';
import RecuperarContrasena from './View/RecuperarContrasenaView';
import Producto from './View/ProductoView';
import Register from './View/RegisterView';
import OrdenCompleta from './Components/OrdenCompleta';
import Faq from './View/FaqView';
import AgregarProductoComponent from './Components/AppComponent';
import AdministradorLoginComponent from './Components/AdminLoginComponent';
import AdministradorLogin from './View/AdministradorLoginView';
import AdminComponent from './Components/AdministradorComponen';
import Administrador from './View/AdministradorView';
import AdminidtradorVerProductosComponent from './Components/AdminVerProductosComponent';
import AdminidtradorVerProductos from './View/AdministradorVerProductosView';
import EditarProducto from './View/EditarProductoView';
import Contacto from './View/ContactanosView';
import NotFound from './Components/NotFound';
import ProductoDescripcion from './View/DescripcionProducto';

import { AuthProvider } from './Javascript/AuthContext';

function App() {
  const encodedPath = AgregarProductoComponent();
  const AdminLogin = AdministradorLoginComponent();
  const Admin = AdminComponent();
  const AdminVerProductos = AdminidtradorVerProductosComponent();

  useEffect(() => {
    axios.get(urlFerrushop)
      .then(() => {
        console.log("Conectado A .NET");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/completa" element={<OrdenCompleta />} />
          <Route path="/producto" element={<Producto />} />
          <Route path="/producto/:id" element={<ProductoDescripcion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path={`/${encodedPath}`} element={<AgregarProducto />} />
          <Route path={`/${AdminLogin}`} element={<AdministradorLogin />} />
          <Route path={`/${Admin}`} element={<Administrador />} />
          <Route path={`/${AdminVerProductos}`} element={<AdminidtradorVerProductos />} />
          <Route path="/editar-producto/:id" element={<EditarProducto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
