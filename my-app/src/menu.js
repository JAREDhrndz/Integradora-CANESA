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
                <img />
            </div>

            {/* Título del menú */}
            <h2 id="menu-title">GESTION</h2>

            {/* Contenedor del menú */}
                <div id="menu-container" className="menu-container animate__animated animate__fadeIn">

                    <Link to="/GestionProveedores" className="menu-item gradient-button blue">
                        <span className="icon icon-1"></span>
                        <span className="gradient-border"></span>
                        <span className="gradient-border2"></span>
                        <span className="button-background"></span>
                        <span className="button-text">PROVEEDORES</span> 
                        <span className="button-text2">Gestion de Ventas</span> 
                    </Link>

                    <Link to="/GestionTrabajadores" className="menu-item gradient-button orange">
                        <span className="icon icon-2"></span>
                        <span className="gradient-border"></span>
                        <span className="gradient-border2"></span>
                        <span className="button-background"></span>
                        <span className="button-text">TRABAJADORES</span> 
                        <span className="button-text2">Gestion de Ventas</span> 
                    </Link>

                    <Link to="/GestionVentas" className="menu-item gradient-button green">
                        <span className="icon icon-3"></span>
                        <span className="gradient-border"></span>
                        <span className="gradient-border2"></span>
                        <span className="button-background"></span>
                        <span className="button-text">VENTAS</span> 
                        <span className="button-text2">Gestion de Ventas</span> 
                    </Link>

                    <Link to="/GestionServicios" className="menu-item gradient-button purple">
                        <span className="icon icon-4"></span>
                        <span className="gradient-border"></span>
                        <span className="gradient-border2"></span>
                        <span className="button-background"></span>
                        <span className="button-text">SERVICIOS</span>
                        <span className="button-text2">Gestion de Ventas</span>  
                    </Link>

                    <Link to="/GestionUsuarios" className="menu-item gradient-button red">
                        <span className="icon icon-5"></span>
                        <span className="gradient-border"></span>
                        <span className="gradient-border2"></span>
                        <span className="button-background"></span>
                        <span className="button-text">USUARIOS</span> 
                        <span className="button-text2">Gestion de Ventas</span> 
                    </Link>

                    <Link to="/Historial" className="menu-item gradient-button blue">
                        <span className="icon icon-6"></span>
                        <span className="gradient-border"></span>
                        <span className="gradient-border2"></span>
                        <span className="button-background"></span>
                        <span className="button-text">HISTORIAL</span> 
                        <span className="button-text2">Gestion de Ventas</span> 
                    </Link>

                </div>
        </div>
    );
};

export default Menu;
