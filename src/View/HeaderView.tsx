import React from 'react';
import '../Css/Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../Javascript/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmed) {
      logout();
      toast.success('Has cerrado sesión', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/');
    }
  };

  return (
    <header>
      <div className='header-one'>
        {isAuthenticated ? (
          <button onClick={handleLogout} className='header-button'>
            Cerrar Sesión
          </button>
        ) : (
          <a href="/login">Login <AiOutlineUser /></a>
        )}
        <a href="/carrito"><IoCartOutline /></a>
      </div>
      <div className='header-container'>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={3}>
            <div className='logo'>
              <h1 className='nombre'>Ferrushop</h1>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <nav>
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/producto">Productos</a></li>
                <li><a href="/nosotros">Nosotros</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/contacto">Contacto</a></li>
              </ul>
            </nav>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div className='buscador'>
              <input type="text" placeholder="Buscar" />
              <button><CiSearch /></button>
            </div>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default Header;
