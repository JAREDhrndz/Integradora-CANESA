// src/MainPage.js
import React, { useEffect } from 'react';
import 'animate.css'; 
import 'aos/dist/aos.css';
import AOS from 'aos';
import './MainPage.css';
import Navbar from './navbar';
import downIcon from './assets/down_icon.png';

const MainPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            const scrolled = window.scrollY; 
            const layer2 = document.querySelector('.layer2');

            layer2.style.transform = `translateY(${scrolled * 0.5}px)`;
            const blurValue = Math.min(scrolled * 0.1, 5);
            layer2.style.filter = `blur(${blurValue}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        // Asegúrate de que la página empiece en la parte superior
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                    onClick={() => document.querySelector('.section1').scrollIntoView({ behavior: 'smooth' })} 
                />
            </div>


        </div>
    );
};

export default MainPage;

