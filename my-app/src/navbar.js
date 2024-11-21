import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import menuIcon from './assets/menu.png';
import logoIcon from './assets/favicon.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <nav className="navbar">
            <div className="logo-icon">
                <Link to="/"><img src={logoIcon} alt="Logo"/></Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <img src={menuIcon} alt="Menú" />
            </div>
            {isOpen && (
                <div className="dropdown" onMouseMove={handleMouseMove} onMouseLeave={closeMenu}>
                    <span
                        className="glow-effect"
                        style={{
                            top: `${glowPosition.y}px`,
                            left: `${glowPosition.x}px`,
                        }}
                    />
                    <Link to="/">Inicio</Link>
                    <Link to="/about">Nosotros</Link>
                    <Link to="/services">Proyectos</Link>
                    <Link to="/citas">Citas</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/menu">Menú</Link>
                    <Link to="/MenuNuevo">Menú Secundario</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
