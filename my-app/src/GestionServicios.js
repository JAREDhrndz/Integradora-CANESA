// src/GestionServicios.js
import React, { useState, useEffect } from 'react';
import './GestionServicios.css';

const GestionServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        costo: '',
    });

    // Función para obtener la lista de servicios
    const fetchServicios = async () => {
        try {
            const response = await fetch('http://localhost/backend/getServicios.php');
            if (!response.ok) throw new Error('Error al obtener los servicios');
            const data = await response.json();
            setServicios(data);
        } catch (error) {
            console.error('Error fetching servicios:', error);
        }
    };

    useEffect(() => {
        fetchServicios();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, nombre, descripcion, costo } = formData;

        try {
            const url = id
                ? 'http://localhost/backend/updateServicio.php'
                : 'http://localhost/backend/addServicio.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id, nombre, descripcion, costo }),
            });

            const result = await response.json();
            if (result.status === "success") fetchServicios();
            else console.error('Error:', result.message);
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ id: '', nombre: '', descripcion: '', costo: '' });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost/backend/deleteServicio.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id }),
            });

            const result = await response.json();
            if (result.status === "success") fetchServicios();
            else console.error('Error eliminando servicio:', result.message);
        } catch (error) {
            console.error('Error eliminando servicio:', error);
        }
    };

    return (
        <div className="gestion-servicios">
            <h2>Gestión de Servicios</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="id" placeholder="ID (solo para actualizar)" value={formData.id} onChange={handleChange} />
                <input type="text" name="nombre" placeholder="Nombre del servicio" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
                <input type="number" step="0.01" name="costo" placeholder="Costo" value={formData.costo} onChange={handleChange} required />
                <button type="submit">{formData.id ? 'Actualizar' : 'Agregar'}</button>
                <button type="button" onClick={() => setFormData({ id: '', nombre: '', descripcion: '', costo: '' })}>Limpiar</button>
            </form>

            <div className="servicios-list">
                <h3>Lista de Servicios</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Costo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map(servicio => (
                            <tr key={servicio.id}>
                                <td>{servicio.id}</td>
                                <td>{servicio.nombre}</td>
                                <td>{servicio.descripcion}</td>
                                <td>{servicio.costo}</td>
                                <td>
                                    <button onClick={() => handleDelete(servicio.id)}>Eliminar</button>
                                    <button onClick={() => setFormData({
                                        id: servicio.id,
                                        nombre: servicio.nombre,
                                        descripcion: servicio.descripcion,
                                        costo: servicio.costo,
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

export default GestionServicios;
