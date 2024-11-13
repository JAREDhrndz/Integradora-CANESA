import React, { useState } from 'react';
import Navbar from './navbar'; // Importa el componente Navbar
import './Login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState(''); // Estado para la contraseña
    const [mensaje, setMensaje] = useState('');
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 }); // Estado para la posición del resplandor
    const [isLogin, setIsLogin] = useState(true); // Estado para controlar si estamos en el formulario de login o de registro
    const [nombre, setNombre] = useState('');
    const [correoRegistro, setCorreoRegistro] = useState('');
    const [contraseñaRegistro, setContraseñaRegistro] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const data = {
            correo: correo,
            contraseña: contraseña,
        };

        const response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setMensaje(result.mensaje);

        if (result.status === 'success') {
            // Redirigir a menu.js si el login es exitoso
            window.location.href = '/menu.js'; // Asegúrate de que esta ruta sea correcta
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        // Verificación de contraseñas
        if (contraseñaRegistro !== confirmarContraseña) {
            setMensaje('Las contraseñas no coinciden');
            return;
        }

        const data = {
            nombre: nombre,
            correo: correoRegistro,
            contraseña: contraseñaRegistro,
        };

        const response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setMensaje(result.mensaje);

        if (result.status === 'success') {
            setIsLogin(true); // Después de registrarse, volver al login
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
                <h2 id="titulo-formulario">{isLogin ? 'Login Administrador' : 'Registrarse'}</h2>
                {isLogin ? (
                    <form onSubmit={handleSubmitLogin}>
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
                        <p id="registro-enlace">
                            ¿No tienes cuenta?{' '}
                            <span 
                                id="registrarse"
                                onClick={() => setIsLogin(false)} // Cambia al formulario de registro
                            >
                                Registrarse
                            </span>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correoRegistro">Correo:</label>
                            <input
                                type="email"
                                id="correoRegistro"
                                value={correoRegistro}
                                onChange={(e) => setCorreoRegistro(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contraseñaRegistro">Contraseña:</label>
                            <input
                                type="password"
                                id="contraseñaRegistro"
                                value={contraseñaRegistro}
                                onChange={(e) => setContraseñaRegistro(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmarContraseña"
                                value={confirmarContraseña}
                                onChange={(e) => setConfirmarContraseña(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Registrarse</button>
                        <p id="login-enlace">
                            ¿Ya tienes cuenta?{' '}
                            <span 
                                id="iniciar-sesion"
                                onClick={() => setIsLogin(true)} // Vuelve al formulario de login
                            >
                                <br/>
                                Iniciar sesión
                            </span>
                        </p>
                    </form>
                )}
                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>
    );
};

export default Login;


