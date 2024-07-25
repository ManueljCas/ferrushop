import React, { useState, useEffect } from 'react';
import '../Css/Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../Javascript/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { isAuthenticated, userId } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/producto?search=${searchTerm}`);
    }
  };

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    const fetchOrderCount = async () => {
      if (isAuthenticated && userId) {
        try {
          const response = await fetch(`https://localhost:7271/api/Order/user/${userId}`);
          if (response.ok) {
            const orders = await response.json();
            setOrderCount(orders.length);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrderCount();
  }, [isAuthenticated, userId]);

  return (
    <>
      <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='header-one-custom'>
          {isAuthenticated ? (
            <a href="/configuracion" id='configuracion'>
              <AiOutlineUser /> <p>Configuración</p>
              {orderCount > 0 && <span className="order-count-custom"><p>{orderCount}</p></span>}
            </a>
          ) : (
            <div>
            <a href="/login">Iniciar sesión</a>
            <a href="/registro">Registrarse</a>
            </div>
            

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
      <div className='Espacio-contenedor'></div> 
    </>
  );
}

export default Header;
