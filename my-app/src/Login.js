import React, { useState } from 'react';
import Navbar from './navbar'; // Importa el componente Navbar
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensaje

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/php/submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `nombre=${encodeURIComponent(username)}`, // Cambia 'nombre' si es necesario
        });

        const data = await response.json();
        setMensaje(data.mensaje); // Mostrar el mensaje recibido
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <h2>Login Administrador</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                {mensaje && <p>{mensaje}</p>} {/* Mostrar mensaje aquí */}
            </div>
        </div>
    );
};

export default Login;
