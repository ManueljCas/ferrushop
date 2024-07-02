import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { urlFerrushop } from './endpoints';

import Login from './View/LoginView';
import Nosotros from './View/NosotrosView';
import Inicio from './View/InicioView';
import RecuperarContrasena from './View/RecuperarContrasenaView';
import Producto from './View/ProductoView';
import Register from './View/RegisterView';
import OrdenCompleta from './Components/OrdenCompleta';
import Faq from './View/FaqView';
import AdministradorLogin from './View/AdministradorLoginView';
import Administrador from './View/AdministradorView';
import EditarProducto from './View/EditarProductoView';
import Contacto from './View/ContactanosView';
import NotFound from './Components/NotFound';
import ProductoDescripcion from './View/DescripcionProducto';
import CarritoView from './View/CarritoView';
import AgregarProductiView from './View/AgregarProductoView';
import AdministrarProductos from './View/AdministradorVerProductosView';

import { AuthProvider } from './Javascript/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
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
      <CartProvider>
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
            <Route path="/carrito" element={<CarritoView />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path={`/QWdyZWdhclByb2R1Y3Rv`} element={<AgregarProductiView />} />
            <Route path={`/U29tZUNvbnRlbnQz`} element={<AdministradorLogin />} />
            <Route path={`/UBKJASNnasjkn1212`} element={<Administrador />} />
            <Route path={`/QWdyZYs1RU03AK`} element={<AdministrarProductos />} />
            <Route path="/editar-producto/:id" element={<EditarProducto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
