import React from 'react';
import '../Css/Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header>
      <div className='header-one'>
        {currentUser ? (
          <Link to="/perfil">Perfil <AiOutlineUser /></Link>
        ) : (
          <Link to="/login">Login <AiOutlineUser /></Link>
        )}
        <a href="/hola"><IoCartOutline /></a>
      </div>
      <div className='header-container'>
        <div className='logo'>
          <h1 className='nombre'>Ferrushop</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/inicio">Inicio</Link></li>
            <li><Link to="/producto">Productos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        <div className='buscador'>
          <input type="text" placeholder="Buscar" />
          <button><CiSearch /></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
