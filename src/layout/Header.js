import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__title">
        <h1>Hello: Alex Rodriguez</h1>
      </div>
      <div className="header__button">
        <button className="CerrarSesion">Cerrar Sesion</button>
      </div>
    </div>
  );
}

export default Header;
