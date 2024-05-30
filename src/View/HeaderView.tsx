import React from 'react';
import '../Css/Header.css';
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Grid from '@material-ui/core/Grid';

function Header() {
  return (
    <header>
      <div className='header-one'>
        <a href="/">Login <AiOutlineUser /></a>
        <a href="/hola"><IoCartOutline /></a>
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
                <li><a href="/inicio">Inicio</a></li>
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
