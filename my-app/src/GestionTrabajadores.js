import React, { useState, useEffect } from 'react';
import './formularios.css';  // Asegúrate de que esta línea esté correcta

const GestionTrabajadores = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        cargo: '',
        telefono: '',
        correo_electronico: '',
    });
    const [isAdding, setIsAdding] = useState(false); // Para mostrar u ocultar el formulario

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
        const { nombre, cargo, telefono, correo_electronico } = formData;

        try {
            const url = isAdding
                ? 'http://localhost/backend/addTrabajador.php'
                : 'http://localhost/backend/updateTrabajador.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ nombre, cargo, telefono, correo_electronico }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchTrabajadores(); // Actualizar la lista
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Limpiar el formulario después de enviar
        setFormData({ nombre: '', cargo: '', telefono: '', correo_electronico: '' });
    };

    const handleDelete = async (numeroEmpleado) => {
        try {
            const response = await fetch('http://localhost/backend/deleteTrabajador.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ numero_empleado: numeroEmpleado }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchTrabajadores(); // Actualizar la lista
            } else {
                console.error('Error eliminando trabajador:', result.message);
            }
        } catch (error) {
            console.error('Error eliminando trabajador:', error);
        }
    };

    const toggleForm = () => {
        setIsAdding(!isAdding); // Alternar entre agregar y editar
        setFormData({ nombre: '', cargo: '', telefono: '', correo_electronico: '' }); // Limpiar el formulario
    };

    const handleEdit = (trabajador) => {
        setFormData({
            nombre: trabajador.Nombre,
            cargo: trabajador.Cargo,
            telefono: trabajador.Telefono,
            correo_electronico: trabajador.Correo_Electronico,
        });
        setIsAdding(false); // Activar el formulario de edición
    };

    return (
        <div id="container" className="container">
            <h2 id="title" className="title">Gestión de Trabajadores</h2>

            {/* Mostrar el botón para agregar trabajador solo si no está en el modo de edición */}
            {!isAdding && (
                <button className="btn-add" onClick={toggleForm}>
                    <span className="icon icon-1"></span>
                    <span className="gradient-insert"></span>
                    <span className="gradient-insert2"></span>
                    <span className="insert-background"></span>
                    <span className="button-insert">Agregar Trabajador</span>
                </button>
            )}

            {/* Mostrar el formulario de agregar/editar trabajador */}
            {isAdding !== null && (
                <div className={`form-add-update ${isAdding ? '' : 'hidden'}`}>
                    <h2 className="title">{isAdding ? 'Agregar Trabajador' : 'Actualizar Trabajador'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="cargo">Cargo:</label>
                        <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="correo_electronico">Correo Electrónico:</label>
                        <input
                            type="email"
                            name="correo_electronico"
                            value={formData.correo_electronico}
                            onChange={handleChange}
                            required
                        />

                        <div className="btn-container-form">
                            <button type="submit" className="btn-update">
                                <span className="icon icon-1"></span>
                                <span className="gradient-update"></span>
                                <span className="gradient-update2"></span>
                                <span className="insert-background"></span>
                                <span className="button-update">{isAdding ? 'Agregar' : 'Actualizar'}</span>
                            </button>

                            <button type="button" className="btn-add" onClick={toggleForm}>
                                <span className="icon icon-1"></span>
                                <span className="gradient-back"></span>
                                <span className="gradient-back2"></span>
                                <span className="insert-background"></span>
                                <span className="button-back">Regresar</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de trabajadores */}
            {!isAdding && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trabajadores.map((trabajador) => (
                            <tr key={trabajador.Numero_empleado}>
                                <td>{trabajador.Nombre}</td>
                                <td>{trabajador.Cargo}</td>
                                <td>{trabajador.Telefono}</td>
                                <td>{trabajador.Correo_Electronico}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(trabajador)}>Editar</button>
                                    <button className="btn-delete" onClick={() => handleDelete(trabajador.Numero_empleado)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GestionTrabajadores;
