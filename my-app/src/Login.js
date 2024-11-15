import React, { useState } from 'react';
import Navbar from './navbar';
import 'react-intl-tel-input/dist/main.css';
import IntlTelInput from 'react-intl-tel-input';
import './Login.css';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [isLogin, setIsLogin] = useState(true);
    const [nombre, setNombre] = useState('');
    const [correoRegistro, setCorreoRegistro] = useState('');
    const [contraseñaRegistro, setContraseñaRegistro] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [telefono, setTelefono] = useState(''); // Estado para el teléfono

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const data = { correo, contraseña };
        const response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/submit.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setMensaje(result.mensaje);
        if (result.status === 'success') {
            window.location.href = '/menu.js';
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if (contraseñaRegistro !== confirmarContraseña) {
            setMensaje('Las contraseñas no coinciden');
            return;
        }

        const data = { nombre, correo: correoRegistro, contraseña: contraseñaRegistro, telefono };
        const response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setMensaje(result.mensaje);
        if (result.status === 'success') {
            setIsLogin(true);
        }
    };

    const handlePhoneChange = (isValid, value, countryData) => {
        setTelefono(`+${countryData.dialCode} ${value}`);
    };

    return (
        <div className="login-wrapper">
            <Navbar />
            <div id="login-container">
                <div className="glow-effect" style={{ top: glowPosition.y, left: glowPosition.x }} />
                <h2 id="titulo-formulario">{isLogin ? 'Login Administrador' : 'Registrarse'}</h2>
                {isLogin ? (
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                            <label htmlFor="correo">Correo:</label>
                            <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contraseña">Contraseña:</label>
                            <input type="password" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
                        </div>
                        <button type="submit">Entrar</button>
                        <p id="registro-enlace">
                            ¿No tienes cuenta?{' '}
                            <span id="registrarse" onClick={() => setIsLogin(false)}>
                                Registrarse
                            </span>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correoRegistro">Correo:</label>
                            <input type="email" id="correoRegistro" value={correoRegistro} onChange={(e) => setCorreoRegistro(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono:</label>
                            <IntlTelInput
                                containerClassName="intl-tel-input"
                                inputClassName="form-control"
                                onPhoneNumberChange={handlePhoneChange}
                                defaultCountry="mx"
                                placeholder=""
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contraseñaRegistro">Contraseña:</label>
                            <input type="password" id="contraseñaRegistro" value={contraseñaRegistro} onChange={(e) => setContraseñaRegistro(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                            <input type="password" id="confirmarContraseña" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} required />
                        </div>
                        <button type="submit">Registrarse</button>
                        <p id="login-enlace">
                            ¿Ya tienes cuenta?{' '}
                            <span id="iniciar-sesion" onClick={() => setIsLogin(true)}>
                                <br />
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
