// src/Section1.js
import React from 'react';
import './section1.css';
import image1 from './assets/image-1.jpg';
import image2 from './assets/image-2.png';
import { Link } from 'react-router-dom';

const Section1 = () => {
    return (
        <div className="section1" id="section1">
            <div className="section-content">
                <div className="text-content">
                    <h2>¿Quiénes Somos?</h2>
                    <p>
                        Aquí va una pequeña descripción sobre tu sección. Puedes hablar de tu equipo, misión, visión o cualquier cosa relevante.
                    </p>
                </div>
                <div className="image-content" id='banner1'>
                    <img src={image1} alt="Imagen 1" data-aos='flip-down'/>
                </div>
                <div className="image-content-2" id='banner2'>
                    <img src={image2} alt="Imagen 2" data-aos='flip-down'/>
                </div>
            </div>
        </div>
    );
};

export default Section1;


