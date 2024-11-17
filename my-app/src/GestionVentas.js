import React, { useState, useEffect } from 'react';
import './GestionVentas.css';

const GestionVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    const [formData, setFormData] = useState({
        descripcion: '',
        tipo_de_pago: '',
        total_pagado: '',
        fecha: '',
        num_usuario: '',
        id_proveedor_servicio: '',
        num_empleado: '',
    });
    const [showForm, setShowForm] = useState(false);

    // Función para obtener ventas
    const fetchVentas = async () => {
        try {
            const response = await fetch('http://localhost/backend/getVentas.php');
            if (!response.ok) {
                throw new Error('Error al obtener datos');
            }
            const data = await response.json();
            setVentas(data);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };

    // Función para obtener trabajadores
    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('http://localhost/backend/getTrabajadores.php');
            if (!response.ok) {
                throw new Error('Error al obtener trabajadores');
            }
            const data = await response.json();
            setTrabajadores(data);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
        }
    };

    useEffect(() => {
        fetchVentas(); // Cargar las ventas al inicio
        fetchTrabajadores(); // Cargar los trabajadores al inicio
    }, []);

    // Actualizar datos del formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Enviar datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/backend/procesar_ventas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, action: 'insert' }),
            });
            if (response.ok) {
                fetchVentas(); // Recargar las ventas
                setFormData({
                    descripcion: '',
                    tipo_de_pago: '',
                    total_pagado: '',
                    fecha: '',
                    num_usuario: '',
                    id_proveedor_servicio: '',
                    num_empleado: '',
                });
                setShowForm(false);
            } else {
                throw new Error('Error al agregar la venta');
            }
        } catch (error) {
            console.error('Error al agregar venta:', error);
        }
    };

    // Eliminar venta
    const handleDelete = async (descripcion) => {
        try {
            const response = await fetch('http://localhost/backend/procesar_ventas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descripcion, action: 'delete' }),
            });
            if (response.ok) {
                fetchVentas(); // Recargar las ventas
            }
        } catch (error) {
            console.error('Error al eliminar venta:', error);
        }
    };

    return (
        <div id="gestion-ventas-container" className="container animate__animated animate__fadeIn">
            <img src="assets/Logo.png" alt="Logo Constructora Canese" id="logo" className="logo" />
            <h2 id="titulo-ventas">Gestión de Ventas</h2>

            {showForm ? (
                <div>
                    <button className="btn-back" onClick={() => setShowForm(false)}>
                        Regresar
                    </button>
                    <form id="form-ventas" onSubmit={handleSubmit}>
                        <label htmlFor="descripcion">Descripción de la venta:</label>
                        <input
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="tipo_de_pago">Tipo de Pago:</label>
                        <select
                            id="tipo_de_pago"
                            name="tipo_de_pago"
                            value={formData.tipo_de_pago}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un tipo de pago</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                        </select>

                        <label htmlFor="total_pagado">Total Pagado:</label>
                        <input
                            type="number"
                            id="total_pagado"
                            name="total_pagado"
                            value={formData.total_pagado}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="datetime-local"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="num_usuario">Número de Usuario:</label>
                        <input
                            type="number"
                            id="num_usuario"
                            name="num_usuario"
                            value={formData.num_usuario}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="id_proveedor_servicio">Proveedor de Servicio:</label>
                        <input
                            type="number"
                            id="id_proveedor_servicio"
                            name="id_proveedor_servicio"
                            value={formData.id_proveedor_servicio}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="num_empleado">Número de Empleado:</label>
                        <input
                            type="number"
                            id="num_empleado"
                            name="num_empleado"
                            value={formData.num_empleado}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">Agregar Venta</button>
                    </form>
                </div>
            ) : (
                <div>
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        Agregar Registro
                    </button>
                    <table id="tabla-ventas">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Tipo de Pago</th>
                                <th>Total Pagado</th>
                                <th>Fecha</th>
                                <th>Usuario</th>
                                <th>Proveedor</th>
                                <th>Empleado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta, index) => (
                                <tr key={index}>
                                    <td>{venta.Descripcion}</td>
                                    <td>{venta.Tipo_de_Pago}</td>
                                    <td>{venta.Total_pagado}</td>
                                    <td>{venta.Fecha}</td>
                                    <td>{venta.Num_usuario}</td>
                                    <td>{venta.Id_proveedor_servicio}</td>
                                    <td>{venta.Num_empleado}</td>
                                    <td>
                                        <button onClick={() => handleDelete(venta.Descripcion)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GestionVentas;
