import React from 'react';
import '../Css/Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

function Header() {
  return (
    <header>
      <div className='header-one'>
        <a href="/">Login <AiOutlineUser /></a>
        <a href="/hola"><IoCartOutline /></a>
      </div>
      <div className='header-container'>
        <div className='logo'>
          <h1 className='nombre'>Ferrushop</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/inicio">Inicio</a></li>
            <li><a href="/acerca">Productos</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/productos">FAQ</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className='buscador'>
          <input type="text" placeholder="Buscar" />
          <button><CiSearch /></button>
        </div>
      </div>
    
    </header>
  );
}

export default Header;
