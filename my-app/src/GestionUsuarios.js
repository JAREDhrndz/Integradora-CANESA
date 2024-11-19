import React, { useState, useEffect } from 'react';
import './GestionUsuarios.css';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        num_usuario: '',
        tipo_usuario: 'Cliente', // Valor por defecto
        nombre: '',
        telefono: '',
        direccion: '',
        correo_electronico: '',
    });
    const [isAdding, setIsAdding] = useState(false); // Estado para saber si estamos añadiendo o viendo la lista

    // Fetch usuarios
    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost/backend/getUsuarios.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Handle delete usuario
    const handleDelete = async (num_usuario) => {
        try {
            const response = await fetch('http://localhost/backend/deleteUsuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ num_usuario }),
            });
            const result = await response.json();
            if (result.status === "success") {
                fetchUsuarios();
            } else {
                console.error('Error al eliminar usuario:', result.message);
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    // Manejar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { num_usuario, tipo_usuario, nombre, telefono, direccion, correo_electronico } = formData;

        try {
            const url = num_usuario
                ? 'http://localhost/backend/updateUsuario.php'
                : 'http://localhost/backend/addUsuario.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ num_usuario, tipo_usuario, nombre, telefono, direccion, correo_electronico }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchUsuarios();
                setIsAdding(false);
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Rellenar los campos del formulario para editar
    const handleEdit = (usuario) => {
        setFormData({
            num_usuario: usuario.Num_Usuario,
            tipo_usuario: usuario.Tipo_usuario,
            nombre: usuario.Nombre,
            telefono: usuario.Telefono,
            direccion: usuario.Direccion,
            correo_electronico: usuario.Correo_Electronico,
        });
        setIsAdding(true); // Abrir el formulario
    };

    return (
        <div id="gestion-usuarios">
            <h1>Usuarios</h1>
            
            {/* Botón para agregar nuevo usuario */}
            {!isAdding && (
                <button onClick={() => setIsAdding(true)}>Insertar Registro</button>
            )}

            {/* Formulario de agregar/actualizar usuario */}
            {isAdding && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="hidden"
                            name="num_usuario"
                            value={formData.num_usuario}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="correo_electronico"
                            placeholder="Correo Electrónico"
                            value={formData.correo_electronico}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="tipo_usuario"
                            value={formData.tipo_usuario}
                            onChange={handleChange}
                            required
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Cliente">Cliente</option>
                            <option value="SuperAdministrador">SuperAdministrador</option>
                        </select>
                        <button type="submit">Guardar</button>
                    </form>
                    <button onClick={() => setIsAdding(false)}>Regresar a la lista</button>
                </div>
            )}

            {/* Lista de usuarios */}
            {!isAdding && (
                <ul>
                    {usuarios.length > 0 ? (
                        usuarios.map(usuario => (
                            <li key={usuario.Num_Usuario}>
                                <p><strong>Nombre:</strong> {usuario.Nombre}</p>
                                <p><strong>Teléfono:</strong> {usuario.Telefono}</p>
                                <p><strong>Dirección:</strong> {usuario.Direccion}</p>
                                <p><strong>Correo:</strong> {usuario.Correo_Electronico}</p>
                                <p><strong>Tipo de Usuario:</strong> {usuario.Tipo_usuario}</p>
                                
                                <button onClick={() => handleDelete(usuario.Num_Usuario)}>Eliminar</button>
                                <button onClick={() => handleEdit(usuario)}>Actualizar</button>
                            </li>
                        ))
                    ) : (
                        <p>No hay usuarios registrados.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default GestionUsuarios;


