// src/Section1.js
import React from 'react';
import './section1.css'; // Asegúrate de que esté en minúsculas

const Section1 = () => {
    return (
        <div className="section1" id="section1"> {/* Agrega el id aquí */}
            <h2>Esta es la sección 1</h2>
            <p>Aquí puedes agregar contenido adicional.</p>
            <h3>Enlaces de Prueba</h3>
            <ul>
                <li><a href="/gestion-trabajadores">Gestión de Trabajadores</a></li>
                <li><a href="/gestion-ventas">Gestión de Ventas</a></li>1
                <li><a href="/otra-seccion">Otra Sección</a></li>
                <li><a href="/formulario-ejemplo">Formulario Ejemplo</a></li>
                <li><a href="/tabla-ejemplo">Tabla Ejemplo</a></li>
            </ul>
        </div>
    );
};

export default Section1;
