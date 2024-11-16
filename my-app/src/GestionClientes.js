// src/GestionClientes.js
import React, { useState, useEffect } from 'react';
import './GestionClientes.css';

const GestionClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        num_usuario: '',
        tipo_usuario: 'Cliente',
        nombre: '',
        telefono: '',
        direccion: '',
        correo_electronico: '',
    });

    // Función para obtener la lista de clientes
    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/getClientes'); // Actualiza con la URL correspondiente
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error('Error fetching clientes:', error);
        }
    };

    // Efecto para cargar clientes al montar el componente
    useEffect(() => {
        fetchClientes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { num_usuario, tipo_usuario, nombre, telefono, direccion, correo_electronico } = formData;

        try {
            let response;
            if (num_usuario) {
                // Actualizar cliente
                response = await fetch('http://localhost:3000/updateCliente', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ num_usuario, tipo_usuario, nombre, telefono, direccion, correo_electronico }),
                });
            } else {
                // Añadir nuevo cliente
                response = await fetch('http://localhost:3000/addCliente', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ tipo_usuario, nombre, telefono, direccion, correo_electronico }),
                });
            }

            const result = await response.json();
            if (result.status === "success") {
                fetchClientes();
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ num_usuario: '', tipo_usuario: 'Cliente', nombre: '', telefono: '', direccion: '', correo_electronico: '' });
    };

    const handleDelete = async (num_usuario) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteCliente`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ num_usuario }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchClientes();
            } else {
                console.error('Error deleting cliente:', result.message);
            }
        } catch (error) {
            console.error('Error deleting cliente:', error);
        }
    };

    return (
        <div className="gestion-clientes">
            <h2>Gestión de Clientes</h2>
            <form onSubmit={handleSubmit} id='form-cliente'>
                <input type="number" name="num_usuario" placeholder="ID del Cliente" value={formData.num_usuario} onChange={handleChange} required />
                <select name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} required>
                    <option value="Cliente">Cliente</option>
                    <option value="Administrador">Administrador</option>
                    <option value="SuperAdministrador">Super Administrador</option>
                </select>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
                <input type="email" name="correo_electronico" placeholder="Correo Electrónico" value={formData.correo_electronico} onChange={handleChange} required />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setFormData({ num_usuario: '', tipo_usuario: 'Cliente', nombre: '', telefono: '', direccion: '', correo_electronico: '' })}>Limpiar</button>
            </form>

            <div className="clientes-list">
                <h3>Lista de Clientes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.num_usuario}>
                                <td>{cliente.num_usuario}</td>
                                <td>{cliente.tipo_usuario}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.correo_electronico}</td>
                                <td>
                                    <button onClick={() => handleDelete(cliente.num_usuario)}>Eliminar</button>
                                    <button onClick={() => setFormData({
                                        num_usuario: cliente.num_usuario,
                                        tipo_usuario: cliente.tipo_usuario,
                                        nombre: cliente.nombre,
                                        telefono: cliente.telefono,
                                        direccion: cliente.direccion,
                                        correo_electronico: cliente.correo_electronico,
                                    })}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionClientes;
