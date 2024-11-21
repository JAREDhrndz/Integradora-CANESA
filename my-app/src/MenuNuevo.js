import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MenuNuevo.css';

const MenuNuevo = () => {
    useEffect(() => {
        document.body.classList.add("center-content-new");
        return () => document.body.classList.remove("center-content-new");
    }, []);

    return (
        <div>
            {/* Contenedor del logo */}
            <div className="logo-container-new">
                <img />
            </div>

            {/* Título del menú */}
            <h2 id="new-menu-title">GESTION NUEVA</h2>

            {/* Contenedor del menú */}
            <div id="new-menu-container" className="menu-container animate__animated animate__fadeIn">

                <Link to="/GestionProveedores" className="new-menu-item new-gradient-button blue">
                    <span className="new-icon new-icon-1"></span>
                    <span className="new-gradient-border"></span>
                    <span className="new-gradient-border2"></span>
                    <span className="new-button-background"></span>
                    <span className="new-button-text">PROVEEDORES</span> 
                    <span className="new-button-text2">Gestion de Ventas</span> 
                </Link>

                <Link to="/GestionTrabajadores" className="new-menu-item new-gradient-button orange">
                    <span className="new-icon new-icon-2"></span>
                    <span className="new-gradient-border"></span>
                    <span className="new-gradient-border2"></span>
                    <span className="new-button-background"></span>
                    <span className="new-button-text">TRABAJADORES</span> 
                    <span className="new-button-text2">Gestion de Ventas</span> 
                </Link>

                <Link to="/GestionVentas" className="new-menu-item new-gradient-button green">
                    <span className="new-icon new-icon-3"></span>
                    <span className="new-gradient-border"></span>
                    <span className="new-gradient-border2"></span>
                    <span className="new-button-background"></span>
                    <span className="new-button-text">VENTAS</span> 
                    <span className="new-button-text2">Gestion de Ventas</span> 
                </Link>

                <Link to="/GestionServicios" className="new-menu-item new-gradient-button purple">
                    <span className="new-icon new-icon-4"></span>
                    <span className="new-gradient-border"></span>
                    <span className="new-gradient-border2"></span>
                    <span className="new-button-background"></span>
                    <span className="new-button-text">SERVICIOS</span>
                    <span className="new-button-text2">Gestion de Ventas</span>  
                </Link>

                <Link to="/GestionUsuarios" className="new-menu-item new-gradient-button red">
                    <span className="new-icon new-icon-5"></span>
                    <span className="new-gradient-border"></span>
                    <span className="new-gradient-border2"></span>
                    <span className="new-button-background"></span>
                    <span className="new-button-text">USUARIOS</span> 
                    <span className="new-button-text2">Gestion de Ventas</span> 
                </Link>

            </div>
        </div>
    );
};

export default MenuNuevo;
