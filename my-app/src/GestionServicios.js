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
    const [showForm, setShowForm] = useState(false);

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
            if (result.status === "success") {
                fetchServicios();
                setShowForm(false);
            } else {
                console.error('Error:', result.message);
            }
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
        <div id="gestion-servicios-container">
            <h2 id="gestion-servicios-title">Gestión de Servicios</h2>
            {!showForm ? (
                <>
                    <button id="insertar-servicio-btn" onClick={() => setShowForm(true)}>Insertar Nuevo Servicio</button>
                    <div id="servicios-list">
                        <h3 id="servicios-list-title">Lista de Servicios</h3>
                        <table id="servicios-table">
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
                                {Array.isArray(servicios) && servicios.length > 0 ? (
                                    servicios.map(servicio => (
                                        <tr key={servicio.id}>
                                            <td>{servicio.id}</td>
                                            <td>{servicio.nombre}</td>
                                            <td>{servicio.descripcion}</td>
                                            <td>{servicio.costo}</td>
                                            <td>
                                                <button className="eliminar-btn" onClick={() => handleDelete(servicio.id)}>Eliminar</button>
                                                <button className="editar-btn" onClick={() => {
                                                    setFormData({
                                                        id: servicio.id,
                                                        nombre: servicio.nombre,
                                                        descripcion: servicio.descripcion,
                                                        costo: servicio.costo,
                                                    });
                                                    setShowForm(true);
                                                }}>Editar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No se encontraron servicios</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    <button id="regresar-btn" onClick={() => setShowForm(false)}>Regresar</button>
                    <form id="form-servicio" onSubmit={handleSubmit}>
                        <input id="id-servicio-input" type="number" name="id" placeholder="ID (solo para actualizar)" value={formData.id} onChange={handleChange} />
                        <input id="nombre-servicio-input" type="text" name="nombre" placeholder="Nombre del servicio" value={formData.nombre} onChange={handleChange} required />
                        <input id="descripcion-servicio-input" type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
                        <input id="costo-servicio-input" type="number" step="0.01" name="costo" placeholder="Costo" value={formData.costo} onChange={handleChange} required />
                        <button id="submit-servicio-btn" type="submit">{formData.id ? 'Actualizar' : 'Agregar'}</button>
                        <button id="limpiar-servicio-btn" type="button" onClick={() => setFormData({ id: '', nombre: '', descripcion: '', costo: '' })}>Limpiar</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default GestionServicios;
