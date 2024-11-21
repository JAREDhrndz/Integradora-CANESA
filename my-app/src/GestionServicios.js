import React, { useState, useEffect } from 'react';
import './formularios.css';

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
        <div id="gestion-servicios" className="container">
            <h1 id="titulo-servicios" className="title">Gestión de Servicios</h1>

            {!showForm ? (
                <>
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        <span className="icon icon-1"></span>
                        <span className="gradient-insert"></span>
                        <span className="gradient-insert2"></span>
                        <span className="insert-background"></span>
                        <span className="button-insert">Insertar Nuevo Servicio</span>
                    </button>
                    
                    <table className="table">
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
                                servicios.map((servicio) => (
                                    <tr key={servicio.id}>
                                        <td>{servicio.id}</td>
                                        <td>{servicio.nombre}</td>
                                        <td>{servicio.descripcion}</td>
                                        <td>{servicio.costo}</td>
                                        <td>
                                            <button className="edit" onClick={() => {
                                                setFormData({
                                                    id: servicio.id,
                                                    nombre: servicio.nombre,
                                                    descripcion: servicio.descripcion,
                                                    costo: servicio.costo,
                                                });
                                                setShowForm(true);
                                            }}>Editar</button>
                                            <button className="delete" onClick={() => handleDelete(servicio.id)}>Eliminar</button>
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
                </>
            ) : (
                <div className="form-add-update">
                    <h2 className="title">{formData.id ? 'Actualizar Servicio' : 'Agregar Nuevo Servicio'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="id">ID (solo para actualizar):</label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="ID"
                        />

                        <label htmlFor="nombre">Nombre del servicio:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />

                        <label htmlFor="descripcion">Descripción:</label>
                        <input
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción"
                            required
                        />

                        <label htmlFor="costo">Costo:</label>
                        <input
                            type="number"
                            name="costo"
                            value={formData.costo}
                            onChange={handleChange}
                            placeholder="Costo"
                            step="0.01"
                            required
                        />

                        <div className="btn-container-form">
                            <button type="submit" className="btn-update">
                                <span className="icon icon-1"></span>
                                <span className="gradient-update"></span>
                                <span className="gradient-update2"></span>
                                <span className="insert-background"></span>
                                <span className="button-update">{formData.id ? 'Actualizar Servicio' : 'Agregar Servicio'}</span>
                            </button>

                            <button type="button" className="btn-add" onClick={() => setShowForm(false)}>
                                <span className="icon icon-1"></span>
                                <span className="gradient-back"></span>
                                <span className="gradient-back2"></span>
                                <span className="insert-background"></span>
                                <span className="button-back">Regresar a la lista</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GestionServicios;
