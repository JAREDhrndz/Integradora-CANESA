// src/Menu.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    useEffect(() => {
        document.body.classList.add("center-content");
        return () => document.body.classList.remove("center-content");
    }, []);

    return (
        <div>
            {/* Contenedor del logo */}
            <div className="logo-container">
                <img/>
            </div>

            {/* Título del menú */}
            <h2 id="menu-title">Menú Principal</h2>
            <h3 id="menu-subtitle">Apartados</h3>

            {/* Contenedor del menú */}
            <div id="menu-container" className="menu-container animate__animated animate__fadeIn">
                {/* Primeras tres opciones */}
                <Link to="/GestionProveedores" className="menu-item">Proveedores</Link>
                <Link to="/GestionTrabajadores" className="menu-item">Trabajadores</Link>
                <Link to="/GestionVentas" className="menu-item">Ventas</Link>
                <Link to="/GestionServicios" className="menu-item">Gestion de Servicios</Link>
                <Link to="/GestionClientes" className="menu-item">Gestion de Clientes</Link>
                <Link to="/Hsitorial" className="menu-item">Historial de Cambios</Link>
            </div>

            {/* Botón de regresar */}
            <div id="back-button-container" className="back-button-container">
                <button
                    id="back-button"
                    className="btn-back"
                    onClick={() => window.location.href = 'index.html'}
                >
                    Regresar al Menú
                </button>
            </div>
        </div>
    );
};

export default Menu;
