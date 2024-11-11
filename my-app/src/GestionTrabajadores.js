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

    // Función para obtener la lista de trabajadores
    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/getTrabajadores.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrabajadores(data); // Actualiza el estado con los datos obtenidos
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
        }
    };

    // Efecto para cargar trabajadores al montar el componente
    useEffect(() => {
        fetchTrabajadores(); // Llama a la función al cargar el componente
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        const { id, nombre, cargo, telefono, correo } = formData;

        try {
            let response;
            if (id) {
                // Actualizar trabajador
                response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/updateTrabajador.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({ id, nombre, cargo, telefono, correo }),
                });
            } else {
                // Añadir nuevo trabajador
                response = await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/addTrabajador.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({ 
                        nombre_trabajador: nombre, 
                        cargo_trabajador: cargo, 
                        telefono_trabajador: telefono, 
                        correo_trabajador: correo 
                    }),
                });
            }

            const result = await response.json();
            if (result.status === "success") {
                fetchTrabajadores(); // Llama a esta función para actualizar la lista
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reiniciar el formulario después de guardar
        setFormData({ id: '', nombre: '', cargo: '', telefono: '', correo: '' });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:84/Integradora-CANESA-2/my-app/backend/deleteTrabajador.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchTrabajadores(); // Actualiza la lista de trabajadores después de eliminar
            } else {
                console.error('Error deleting trabajador:', result.message);
            }
        } catch (error) {
            console.error('Error deleting trabajador:', error);
        }
    };

    return (
        <div className="gestion-trabajadores">
            <h2>Gestión de Trabajadores</h2>
            <form onSubmit={handleSubmit} id='form2'>
                <input type="number" name="id" placeholder="ID del Trabajador" value={formData.id} onChange={handleChange} required />
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                <input type="text" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} required />
                <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setFormData({ id: '', nombre: '', cargo: '', telefono: '', correo: '' })}>Limpiar</button>
                <button type="button" onClick={async () => {
                    const { nombre, cargo, telefono, correo } = formData;
                    if (nombre && cargo && telefono && correo) {
                        await fetch('http://localhost:84/Integradora-CANESA-2/my-app/backend/addTrabajador.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: new URLSearchParams({ nombre, cargo, telefono, correo }),
                        });
                        fetchTrabajadores(); // Actualiza la lista después de agregar
                        setFormData({ id: '', nombre: '', cargo: '', telefono: '', correo: '' }); // Reinicia el formulario
                    }
                }}>Insertar</button>
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

export default GestionTrabajadores;

