import React, { useState, useEffect } from 'react';
import './formularios.css';

const GestionProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        correo_electronico: '',
        telefono: '',
        detalles: '',
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(true);
    const [proveedorId, setProveedorId] = useState(null);

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
        const { nombre, correo_electronico, telefono, detalles } = formData;

        try {
            const url = isAdding
                ? 'http://localhost/backend/addProveedor.php'
                : 'http://localhost/backend/updateProveedor.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: proveedorId,
                    nombre,
                    correo_electronico,
                    telefono,
                    detalles,
                }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                fetchProveedores();
                setIsFormVisible(false);
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ nombre: '', correo_electronico: '', telefono: '', detalles: '' });
        setIsAdding(true);
        setProveedorId(null);
    };

    const handleDelete = async (nombre) => {
        try {
            const response = await fetch('http://localhost/backend/delProveedores.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ nombre }),
            });

            const result = await response.json();
            if (result.status === 'success') fetchProveedores();
            else console.error('Error eliminando proveedor:', result.message);
        } catch (error) {
            console.error('Error eliminando proveedor:', error);
        }
    };

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
        setIsAdding(true);
        setFormData({ nombre: '', correo_electronico: '', telefono: '', detalles: '' });
        setProveedorId(null);
    };

    const handleEdit = (proveedor) => {
        setFormData({
            nombre: proveedor.Nombre,
            correo_electronico: proveedor.Correo_Electronico,
            telefono: proveedor.Telefono,
            detalles: proveedor.Detalles,
        });
        setProveedorId(proveedor.N_proveedor);
        setIsAdding(false);
        setIsFormVisible(true);
    };

    return (
        <div className="container">
            <h1 className="title">Gestión de Proveedores</h1>

            {/* Mostrar el botón para agregar proveedor solo si no está en el modo de edición */}
            {!isFormVisible && (
                <button className="btn-add" onClick={toggleForm}>
                    <span className="icon icon-1"></span>
                    <span className="gradient-insert"></span>
                    <span className="gradient-insert2"></span>
                    <span className="insert-background"></span>
                    <span className="button-insert">Insertar Registro</span>
                </button>
            )}

            {/* Mostrar el formulario de agregar o editar solo cuando isFormVisible es true */}
            {isFormVisible && (
                <form className="form-add-update" onSubmit={handleSubmit}>
                    <label>Nombre del Proveedor:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

                    <label>Correo Electrónico:</label>
                    <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} required />

                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />

                    <label>Detalles:</label>
                    <input type="text" name="detalles" value={formData.detalles} onChange={handleChange} required />

                    <input type="submit" value={isAdding ? "Agregar" : "Guardar"} />
                    <button type="button" onClick={toggleForm}>Regresar</button>
                </form>
            )}

            {/* Tabla de proveedores */}
            {!isFormVisible && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Teléfono</th>
                            <th>Detalles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.N_proveedor}>
                                <td>{proveedor.Nombre}</td>
                                <td>{proveedor.Correo_Electronico}</td>
                                <td>{proveedor.Telefono}</td>
                                <td>{proveedor.Detalles}</td>
                                <td>
                                    <button className="edit" onClick={() => handleEdit(proveedor)}>
                                        <span className="icon icon-edit"></span> Editar
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(proveedor.Nombre)}>
                                        <span className="icon icon-delete"></span> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GestionProveedores;
