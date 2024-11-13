// src/Menu.js
import React, { useEffect } from 'react';
import './menu.css';

const Menu = () => {
    useEffect(() => {
        // Aquí añadimos la clase "center-content" al body
        document.body.classList.add("center-content");
    }, []);

    return (
        <div>
            {/* Contenedor del logo */}
            <div id="logo-container" className="logo-container">
                <img src="assets/Logo.png" alt="Logo Constructora Canese" id="logo" className="logo" />
            </div>

            {/* Título del menú */}
            <h2 id="menu-title">Menú Principal</h2>
            <h3 id="menu-subtitle">Apartados</h3>

            {/* Contenedor del menú */}
            <div id="menu-container" className="menu-container animate__animated animate__fadeIn">
                {[ 
                    { href: "gestion_citas.html", text: "Gestión Citas" },
                    { href: "gestion_proveedores.html", text: "Gestión Proveedores" },
                    { href: "gestion_trabajadores.html", text: "Gestión Trabajadores" },
                    { href: "servicios.html", text: "Servicios" },
                    { href: "ventas.html", text: "Ventas" },
                    { href: "/gestion-trabajadores", text: "Gestión de Trabajadores" }, // Enlace de prueba
                    { href: "/gestion-ventas", text: "Gestión de Ventas" }, // Enlace de prueba
                    { href: "/otra-seccion", text: "Otra Sección" }, // Enlace de prueba
                    { href: "/formulario-ejemplo", text: "Formulario Ejemplo" }, // Enlace de prueba
                    { href: "/tabla-ejemplo", text: "Tabla Ejemplo" } // Enlace de prueba
                ].map((item, index) => (
                    <a key={index} href={item.href} id={`menu-item-${index}`} className="menu-item">{item.text}</a>
                ))}
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
