// src/Section1.js
import React from 'react';
import './section1.css'; // Asegúrate de que esté en minúsculas
import image1 from './assets/image-1.jpg'; // Imagen importada

const Section1 = () => {
    return (
        <div className="section1" id="section1">
            <div className="section-content">
                <div className="text-content">
                    <h2>¿Quiénes Somos?</h2>
                    <p>
                        Aquí va una pequeña descripción sobre tu sección. Puedes hablar de tu equipo, misión, visión o cualquier cosa relevante. Este texto está diseñado para enganchar al usuario y dar información clara.
                    </p>
                </div>
                <div className="image-content">
                    <img src={image1} alt="Imagen Creativa" data-aos='flip-down'/>
                </div>
            </div>
        </div>
    );
};

export default Section1;


