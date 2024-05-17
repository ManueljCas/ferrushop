import React from 'react';
import '../Css/Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";




function Header() {
  return (
    <header>
        <div className='header-one'>
        <a href="/hola">Login <AiOutlineUser /></a>
        <a href="/hola"><IoCartOutline /></a>
        </div>
      <nav>
        <ul>
          <li><h1>Ferrushop</h1></li>
          <li><a href="/inicio">Inicio</a></li>
          <li><a href="/acerca">Productos</a></li>
          <li><a href="/servicios">Nosotros</a></li>
          <li><a href="/productos">FAQ</a></li>
          <li><a href="/contacto">Contacto</a></li>
          <input type="text" placeholder="Buscar" />
          <button><CiSearch /></button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
