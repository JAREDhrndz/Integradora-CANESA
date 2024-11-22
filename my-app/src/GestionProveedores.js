import React, { useState, useEffect } from 'react';
import './formularios.css';
import editIcon from './assets/icons/edit.png';
import deleteIcon from './assets/icons/delete.png';

const GestionProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        correo_electronico: '',
        telefono: '',
        detalles: '',
    });
    const [showForm, setShowForm] = useState(false);

    const fetchProveedores = async () => {
        try {
            const response = await fetch('http://localhost/backend/getProveedores.php');
            if (!response.ok) throw new Error('Error al obtener los proveedores');
            const data = await response.json();
            setProveedores(data);
        } catch (error) {
            console.error('Error fetching proveedores:', error);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, nombre, correo_electronico, telefono, detalles } = formData;

        try {
            const url = id
                ? 'http://localhost/backend/updateProveedor.php'
                : 'http://localhost/backend/addProveedor.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id, nombre, correo_electronico, telefono, detalles }),
            });

            const result = await response.json();
            if (result.status === "success") {
                fetchProveedores();
                setShowForm(false);
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ id: '', nombre: '', correo_electronico: '', telefono: '', detalles: '' });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch('http://localhost/backend/deleteProveedor.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ id }),
            });

            const result = await response.json();
            if (result.status === "success") fetchProveedores();
            else console.error('Error eliminando proveedor:', result.message);
        } catch (error) {
            console.error('Error eliminando proveedor:', error);
        }
    };

    return (
        <div id="gestion-proveedores" className="container">
            <h1 id="titulo-proveedores" className="title">Gestión de Proveedores</h1>

            {!showForm ? (
                <>
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        <span className="icon icon-1"></span>
                        <span className="gradient-insert"></span>
                        <span className="gradient-insert2"></span>
                        <span className="insert-background"></span>
                        <span className="button-insert">Insertar Nuevo Proveedor</span>
                    </button>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono</th>
                                <th>Detalles</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
    {Array.isArray(proveedores) && proveedores.length > 0 ? (
        proveedores.map((proveedor) => (
            <tr key={proveedor.N_proveedor}>
                <td>{proveedor.N_proveedor}</td>
                <td>{proveedor.Nombre}</td>
                <td>{proveedor.Correo_Electronico}</td>
                <td>{proveedor.Telefono}</td>
                <td>{proveedor.Detalles}</td>
            <td>
                    <div className="btn-actions">
                        <button className="btn-icon edit" onClick={() => {
                            setFormData({
                                id: proveedor.N_proveedor,
                                nombre: proveedor.Nombre,
                                correo_electronico: proveedor.Correo_Electronico,
                                telefono: proveedor.Telefono,
                                detalles: proveedor.Detalles,
                            });
                            setShowForm(true);
                        }}>
                            <img src={editIcon} alt="Editar" />
                        </button>
                        <button className="btn-icon delete" onClick={() => handleDelete(proveedor.N_proveedor)}>
                            <img src={deleteIcon} alt="Eliminar" />
                        </button>
                    </div>
            </td>


            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6">No se encontraron proveedores</td>
        </tr>
    )}
</tbody>

                    </table>
                </>
            ) : (
                <div className="form-add-update">
                    <h2 className="title">{formData.id ? 'Actualizar Proveedor' : 'Agregar Nuevo Proveedor'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="id">ID (solo para actualizar):</label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="ID"
                        />

                        <label htmlFor="nombre">Nombre del proveedor:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
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

                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            required
                        />

                        <label htmlFor="detalles">Detalles:</label>
                        <input
                            type="text"
                            name="detalles"
                            value={formData.detalles}
                            onChange={handleChange}
                            placeholder="Detalles"
                            required
                        />

                        <div className="btn-container-form">
                            <button type="submit" className="btn-update">
                                <span className="icon icon-1"></span>
                                <span className="gradient-update"></span>
                                <span className="gradient-update2"></span>
                                <span className="insert-background"></span>
                                <span className="button-update">{formData.id ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</span>
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

export default GestionProveedores;
