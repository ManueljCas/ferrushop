import React, { useState } from 'react';
import '../Css/Header.css'; // Actualiza el nombre del archivo CSS
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../Javascript/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success('Has cerrado sesión', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'logout-toast',
        });
        navigate('/');
        window.location.reload(); // Recarga la página después de la navegación
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/producto?search=${searchTerm}`);
    }
  };

  return (
    <header>
      <div className='header-one-custom'>
        {isAuthenticated ? (
          <button onClick={handleLogout} className='header-button-custom'>
            Cerrar Sesión
          </button>
        ) : (
          <a href="/login">Login <AiOutlineUser /></a>
        )}
        <a href="/carrito" id='carrito'>
          <IoCartOutline />
          {cart.length > 0 && <span className="cart-count-custom"> <p>{cart.length}</p></span>}
        </a>
      </div>
      <div className='header-container-custom'>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={3}>
            <div className='logo-custom'>
              <h1 className='nombre-custom'>Ferrushop</h1>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <nav>
              <ul className="nav-ul-custom">
                <li className="nav-li-custom"><a href="/">Inicio</a></li>
                <li className="nav-li-custom"><a href="/producto">Productos</a></li>
                <li className="nav-li-custom"><a href="/nosotros">Nosotros</a></li>
                <li className="nav-li-custom"><a href="/faq">FAQ</a></li>
                <li className="nav-li-custom"><a href="/contacto">Contacto</a></li>
              </ul>
            </nav>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div className='buscador-custom'>
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button onClick={handleSearchSubmit}><CiSearch /></button>
            </div>
          </Grid>
        </Grid>
      </div>
    </header>
  );
}

export default Header;
