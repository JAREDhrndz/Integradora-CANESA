// src/MainPage.js
import React, { useEffect } from 'react';
import 'animate.css'; 
import './MainPage.css';
import Navbar from './navbar';
import downIcon from './assets/down_icon.png'; // Asegúrate de importar tu icono de desplazamiento

const MainPage = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY; 
            const layer2 = document.querySelector('.layer2');

            // Ajusta la posición de la capa
            layer2.style.transform = `translateY(${scrolled * 0.5}px)`; // Ajusta la velocidad

            // Aumenta el desenfoque a medida que se desplaza
            const blurValue = Math.min(scrolled * 0.1, 5); // Aplica el desenfoque
            layer2.style.filter = `blur(${blurValue}px)`; // Aplica el desenfoque
        };

        const layer2 = document.querySelector('.layer2');
        layer2.style.transform = `translateY(0)`; // Asegúrate de que comience en la posición correcta

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection1 = () => {
        const section = document.querySelector('.section1');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="main-page">
            <Navbar />
            <div className="parallax-container">
                <div className="parallax layer1"></div>
                <div className="parallax layer2"></div>
                <div className="parallax layer3"></div>
                <div className="content">
                    <h1 id='TEXT1' className="animate__animated animate__fadeInDown">
                        Inmobiliaria y Constructora Canesa. S.A. de C.V.
                    </h1>
                    <p className="animate__animated animate__fadeInDown">
                        <span id='span1' style={{ color: 'white' }}>Construyendo el futuro </span> 
                        <span id='span2' style={{ color: '#b48250' }}> Construyendo hogares</span>
                    </p>
                </div>
            </div>
            <div className="scroll-button-container">
                <img 
                    src={downIcon}  
                    alt="Scroll Down"
                    className="scroll-button" 
                    onClick={scrollToSection1} 
                />
            </div>
            {/* Sección 1 (asegúrate de que esta clase esté definida en tu CSS) */}
            <div className="section1">
                <h2>Sección 1</h2>
                {/* Contenido de la sección 1 */}
            </div>
        </div>
    );
};

export default MainPage;
