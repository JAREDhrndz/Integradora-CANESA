import React, { useState, useEffect } from 'react';
import './GestionUsuarios.css';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        num_usuario: '',
        tipo_usuario: 'Usuario',
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
        console.log(`Eliminar usuario con num_usuario: ${num_usuario}`);
        // Aquí va el código para eliminar el usuario (similar a como lo hacías antes)
    };

    // Manejar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Mostrar los datos del formulario en la consola
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
                            type="text"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Dirección"
                            value={formData.direccion}
                            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={formData.correo_electronico}
                            onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })}
                        />
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
                                
                                <button onClick={() => handleDelete(usuario.Num_Usuario)}>Eliminar</button>
                                <button onClick={() => setFormData(usuario)}>Actualizar</button>
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

