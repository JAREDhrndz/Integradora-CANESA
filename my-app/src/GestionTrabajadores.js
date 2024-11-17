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
    const [showForm, setShowForm] = useState(false); // Estado para alternar entre lista y formulario

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
            if (result.status === "success") {
                fetchTrabajadores();
                setShowForm(false); // Regresar a la lista después de agregar/actualizar
            } else {
                console.error('Error:', result.message);
            }
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
        <div id="gestion-trabajadores">
            <h2 id="gestion-title">Gestión de Trabajadores</h2>
            {!showForm ? (
                <>
                    <button id="add-btn" onClick={() => setShowForm(true)}>Agregar Registro</button>
                    <div id="trabajadores-list">
                        <h3 id="trabajadores-list-title">Lista de Trabajadores</h3>
                        <table id="trabajadores-table">
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
                                    <tr key={trabajador.Numero_empleado}>
                                        <td>{trabajador.Numero_empleado}</td>
                                        <td>{trabajador.Nombre}</td>
                                        <td>{trabajador.Cargo}</td>
                                        <td>{trabajador.Telefono}</td>
                                        <td>{trabajador.Correo_Electronico}</td>
                                        <td>
                                            <button id={`delete-btn-${trabajador.Numero_empleado}`} onClick={() => handleDelete(trabajador.Numero_empleado)}>Eliminar</button>
                                            <button id={`edit-btn-${trabajador.Numero_empleado}`} onClick={() => {
                                                setFormData({
                                                    id: trabajador.Numero_empleado,
                                                    nombre: trabajador.Nombre,
                                                    cargo: trabajador.Cargo,
                                                    telefono: trabajador.Telefono,
                                                    correo: trabajador.Correo_Electronico,
                                                });
                                                setShowForm(true);
                                            }}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <form id="trabajador-form" onSubmit={handleSubmit}>
                    <input id="input-id" type="number" name="id" placeholder="ID del Trabajador" value={formData.id} onChange={handleChange} />
                    <input id="input-nombre" type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                    <input id="input-cargo" type="text" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} required />
                    <input id="input-telefono" type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                    <input id="input-correo" type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required />
                    <button id="submit-btn" type="submit">{formData.id ? 'Actualizar' : 'Agregar'}</button>
                    <button id="cancel-btn" type="button" onClick={() => setShowForm(false)}>Regresar</button>
                </form>
            )}
        </div>
    );
};

export default GestionTrabajadores;
