import React, { useState, useEffect } from 'react';

const GestionProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        nombre_proveedor: '',
        contacto: '',
        telefono: '',
    });
    const [isAdding, setIsAdding] = useState(false);

    // Función para obtener la lista de proveedores
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
        const { nombre_proveedor, contacto, telefono } = formData;

        try {
            const url = isAdding
                ? 'http://localhost/backend/addProveedor.php'
                : 'http://localhost/backend/updateProveedor.php';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ nombre_proveedor, contacto, telefono }),
            });

            const result = await response.json();
            if (result.status === "success") fetchProveedores();
            else console.error('Error:', result.message);
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ nombre_proveedor: '', contacto: '', telefono: '' });
    };

    const handleDelete = async (nombre_proveedor) => {
        try {
            const response = await fetch('http://localhost/backend/deleteProveedor.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ nombre_proveedor }),
            });

            const result = await response.json();
            if (result.status === "success") fetchProveedores();
            else console.error('Error eliminando proveedor:', result.message);
        } catch (error) {
            console.error('Error eliminando proveedor:', error);
        }
    };

    const toggleForm = () => {
        setIsAdding(!isAdding);
        setFormData({ nombre_proveedor: '', contacto: '', telefono: '' });
    };

    return (
        <div id="container" className="animate__animated animate__fadeIn">
            <img id="logo" src="assets/Logo.png" alt="Logo Constructora Canese" />
            <h2 id="title">Registro de Proveedores</h2>

            {/* Botón para agregar proveedor */}
            {!isAdding && (
                <button id="btn-add" onClick={toggleForm}>Agregar Proveedor</button>
            )}

            {/* Formulario para agregar/actualizar proveedor */}
            {isAdding && (
                <form id="form-add-update" onSubmit={handleSubmit}>
                    <label id="label-nombre-proveedor">Nombre del Proveedor:</label>
                    <input id="input-nombre-proveedor" type="text" name="nombre_proveedor" value={formData.nombre_proveedor} onChange={handleChange} required />

                    <label id="label-contacto">Contacto (Email):</label>
                    <input id="input-contacto" type="email" name="contacto" value={formData.contacto} onChange={handleChange} required />

                    <label id="label-telefono">Teléfono:</label>
                    <input id="input-telefono" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />

                    <input id="submit-agregar" type="submit" value={isAdding ? "Agregar" : "Actualizar"} />
                    <button type="button" onClick={toggleForm}>Regresar</button>
                </form>
            )}

            {/* Tabla de proveedores */}
            {!isAdding && (
                <table id="tabla-proveedores">
                    <thead>
                        <tr>
                            <th id="th-proveedor">Proveedor</th>
                            <th id="th-contacto">Contacto</th>
                            <th id="th-telefono">Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map(proveedor => (
                            <tr key={proveedor.nombre_proveedor}>
                                <td>{proveedor.nombre_proveedor}</td>
                                <td>{proveedor.contacto}</td>
                                <td>{proveedor.telefono}</td>
                                <td>
                                    <button onClick={() => handleDelete(proveedor.nombre_proveedor)}>Eliminar</button>
                                    <button onClick={() => {
                                        setFormData({
                                            nombre_proveedor: proveedor.nombre_proveedor,
                                            contacto: proveedor.contacto,
                                            telefono: proveedor.telefono,
                                        });
                                        setIsAdding(false);
                                    }}>Editar</button>
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
