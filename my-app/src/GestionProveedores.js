import React, { useState, useEffect } from 'react';

const GestionProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        correo_electronico: '',
        telefono: '',
        detalles: '',
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
                body: new URLSearchParams({ nombre, correo_electronico, telefono, detalles }),
            });

            const result = await response.json();
            if (result.status === "success") fetchProveedores();
            else console.error('Error:', result.message);
        } catch (error) {
            console.error('Error:', error);
        }

        setFormData({ nombre: '', correo_electronico: '', telefono: '', detalles: '' });
    };

    const handleDelete = async (nombre) => {
        try {
            const response = await fetch('http://localhost/backend/deleteProveedor.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ nombre }),
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
        setFormData({ nombre: '', correo_electronico: '', telefono: '', detalles: '' });
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
                    <label id="label-nombre">Nombre del Proveedor:</label>
                    <input id="input-nombre" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

                    <label id="label-correo_electronico">Correo Electrónico:</label>
                    <input id="input-correo_electronico" type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} required />

                    <label id="label-telefono">Teléfono:</label>
                    <input id="input-telefono" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />

                    <label id="label-detalles">Detalles:</label>
                    <input id="input-detalles" type="text" name="detalles" value={formData.detalles} onChange={handleChange} required />

                    <input id="submit-agregar" type="submit" value={isAdding ? "Agregar" : "Actualizar"} />
                    <button type="button" onClick={toggleForm}>Regresar</button>
                </form>
            )}

            {/* Tabla de proveedores */}
            {!isAdding && (
                <table id="tabla-proveedores">
                    <thead>
                        <tr>
                            <th id="th-nombre">Nombre</th>
                            <th id="th-correo_electronico">Correo Electrónico</th>
                            <th id="th-telefono">Teléfono</th>
                            <th id="th-detalles">Detalles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map(proveedor => (
                            <tr key={proveedor.N_proveedor}> {/* Usamos N_proveedor como key */}
                                <td>{proveedor.Nombre}</td>
                                <td>{proveedor.Correo_Electronico}</td>
                                <td>{proveedor.Telefono}</td>
                                <td>{proveedor.Detalles}</td>
                                <td>
                                    <button onClick={() => handleDelete(proveedor.Nombre)}>Eliminar</button>
                                    <button onClick={() => {
                                        setFormData({
                                            nombre: proveedor.Nombre,
                                            correo_electronico: proveedor.Correo_Electronico,
                                            telefono: proveedor.Telefono,
                                            detalles: proveedor.Detalles,
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
