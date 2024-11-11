import React, { useState } from 'react';
import Navbar from './navbar'; // Importa el componente Navbar
import './Login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState(''); // Estado para la contraseña
    const [mensaje, setMensaje] = useState('');
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 }); // Estado para la posición del resplandor

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            correo: correo,
            contraseña: contraseña,
        };

        const response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Cambiado a JSON
            },
            body: JSON.stringify(data), // Convertir el objeto a JSON
        });

        const result = await response.json();
        setMensaje(result.mensaje);

        if (result.status === 'success') {
            // Redirigir a menu.js si el login es exitoso
            window.location.href = '/menu.js'; // Asegúrate de que esta ruta sea correcta
        }
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setGlowPosition({ x, y });
    };

    return (
        <div className="login-wrapper">
            <Navbar />
            <div 
                id="login-container" 
                onMouseMove={handleMouseMove} // Actualizar posición del resplandor
            >
                <div 
                    className="glow-effect" 
                    style={{ top: glowPosition.y, left: glowPosition.x }}
                />
                <h2>Login Administrador</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="correo">Correo:</label>
                        <input
                            type="email"
                            id="correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña:</label>
                        <input
                            type="password"
                            id="contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
};

export default Login;
