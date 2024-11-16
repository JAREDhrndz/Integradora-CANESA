// src/GestionTrabajadores.js
import React, { useState, useEffect } from 'react';
import './GestionTrabajadores.css';

const GestionTrabajadores = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        cargo: '',
        telefono: '',
        correo: '',
    });

    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('http://localhost/backend/getTrabajadores.php');
            if (!response.ok) throw new Error('Error al obtener los trabajadores');
            const data = await response.json();
            setTrabajadores(data);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
        }
    };

    useEffect(() => {
        fetchTrabajadores();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, nombre, cargo, telefono, correo } = formData;

        try {
            const url = id
                ? 'http://localhost/backend/updateTrabajador.php'
                : 'http://localhost/backend/addTrabajador.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id, nombre, cargo, telefono, correo }),
            });

            const result = await response.json();
            if (result.status === "success") fetchTrabajadores();
            else console.error('Error:', result.message);
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ id: '', nombre: '', cargo: '', telefono: '', correo: '' });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost/backend/deleteTrabajador.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id }),
            });

            const result = await response.json();
            if (result.status === "success") fetchTrabajadores();
            else console.error('Error eliminando trabajador:', result.message);
        } catch (error) {
            console.error('Error eliminando trabajador:', error);
        }
    };

    return (
        <div className="gestion-trabajadores">
            <h2>Gestión de Trabajadores</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="id" placeholder="ID del Trabajador" value={formData.id} onChange={handleChange} />
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} required />
                <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required />
                <button type="submit">{formData.id ? 'Actualizar' : 'Agregar'}</button>
                <button type="button" onClick={() => setFormData({ id: '', nombre: '', cargo: '', telefono: '', correo: '' })}>Limpiar</button>
            </form>

            <div className="trabajadores-list">
                <h3>Lista de Trabajadores</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trabajadores.map(trabajador => (
                            <tr key={trabajador.id_trabajador}>
                                <td>{trabajador.id_trabajador}</td>
                                <td>{trabajador.nombre_trabajador}</td>
                                <td>{trabajador.cargo_trabajador}</td>
                                <td>{trabajador.telefono_trabajador}</td>
                                <td>{trabajador.correo_trabajador}</td>
                                <td>
                                    <button onClick={() => handleDelete(trabajador.id_trabajador)}>Eliminar</button>
                                    <button onClick={() => setFormData({
                                        id: trabajador.id_trabajador,
                                        nombre: trabajador.nombre_trabajador,
                                        cargo: trabajador.cargo_trabajador,
                                        telefono: trabajador.telefono_trabajador,
                                        correo: trabajador.correo_trabajador,
                                    })}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionTrabajadores;

