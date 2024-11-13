// src/Section2.js
import React from 'react';
import './section2.css'; // Asegúrate de que esté en minúsculas

const Section2 = () => {
    return (
        <div className="section2" id="section2">
            <div className="section2-content" id="section2-content">
                <div className="text-section2" id="text-section2">
                    <h2 id="section2-title">Nuestra Misión</h2>
                    <p id="section2-description">
                        Aquí va una descripción sobre la misión de tu proyecto o empresa. 
                        Este texto debe ser claro y transmitir los valores que deseas que 
                        tu audiencia entienda.
                    </p>
                </div>
                <div className="image-section2" id="image-section2">
                    <img src="/assets/image-2.jpg" alt="Imagen Misión" id="section2-image" />
                </div>
            </div>
        </div>
    );
};

export default Section2;
