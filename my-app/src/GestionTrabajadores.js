import React, { useState, useEffect } from 'react';
import './formularios.css';
import editIcon from './assets/icons/edit.png';
import deleteIcon from './assets/icons/delete.png';

const GestionTrabajadores = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        cargo: '',
        telefono: '',
        correo_electronico: ''
    });
    const [showForm, setShowForm] = useState(false);

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
        const { id, nombre, cargo, telefono, correo_electronico } = formData;

        try {
            const url = id
                ? 'http://localhost/backend/updateTrabajador.php'  // Actualización
                : 'http://localhost/backend/addTrabajador.php';   // Insertar

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id,
                    nombre,
                    cargo,
                    telefono,
                    correo_electronico
                }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchTrabajadores();
                setShowForm(false);
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ id: '', nombre: '', cargo: '', telefono: '', correo_electronico: '' });
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
        <div id="gestion-trabajadores" className="container">
            <h1 id="titulo-trabajadores" className="title">Gestión de Trabajadores</h1>

            {!showForm ? (
                <>
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        <span className="icon icon-1"></span>
                        <span className="gradient-insert"></span>
                        <span className="gradient-insert2"></span>
                        <span className="insert-background"></span>
                        <span className="button-insert">Insertar Nuevo Trabajador</span>
                    </button>

                    <table className="table-general">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cargo</th>
                                <th>Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(trabajadores) && trabajadores.length > 0 ? (
                                trabajadores.map((trabajador) => (
                                    <tr key={trabajador.Numero_empleado}>
                                        <td>{trabajador.Numero_empleado}</td>
                                        <td>{trabajador.Nombre}</td>
                                        <td>{trabajador.Cargo}</td>
                                        <td>{trabajador.Telefono}</td>
                                        <td>{trabajador.Correo_Electronico}</td>
                                        <td>
                                            <div className="btn-actions">
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => {
                                                        setFormData({
                                                            id: trabajador.Numero_empleado,
                                                            nombre: trabajador.Nombre,
                                                            cargo: trabajador.Cargo,
                                                            telefono: trabajador.Telefono,
                                                            correo_electronico: trabajador.Correo_Electronico,
                                                        });
                                                        setShowForm(true);
                                                    }}
                                                >
                                                    <img src={editIcon} alt="Editar" />
                                                </button>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => handleDelete(trabajador.Numero_empleado)}
                                                >
                                                    <img src={deleteIcon} alt="Eliminar" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="no-records">
                                    <td colSpan="6">No se encontraron trabajadores</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="form-add-update">
                    <h2 className="title">{formData.id ? 'Actualizar Trabajador' : 'Agregar Nuevo Trabajador'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="id">ID (solo para actualizar):</label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="ID"
                        />

                        <label htmlFor="nombre">Nombre del trabajador:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />

                        <label htmlFor="cargo">Cargo:</label>
                        <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            placeholder="Cargo"
                            required
                        />

                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            required
                        />

                        <label htmlFor="correo_electronico">Correo Electrónico:</label>
                        <input
                            type="email"
                            name="correo_electronico"
                            value={formData.correo_electronico}
                            onChange={handleChange}
                            placeholder="Correo Electrónico"
                            required
                        />

                        <div className="btn-container-form">
                            <button type="submit" className="btn-update">
                                <span className="icon icon-1"></span>
                                <span className="gradient-update"></span>
                                <span className="gradient-update2"></span>
                                <span className="insert-background"></span>
                                <span className="button-update">{formData.id ? 'Actualizar Trabajador' : 'Agregar Trabajador'}</span>
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

export default GestionTrabajadores;
