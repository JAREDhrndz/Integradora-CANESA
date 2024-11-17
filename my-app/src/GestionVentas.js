import React, { useState, useEffect } from 'react';
import './GestionVentas.css';

const GestionVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    const [formData, setFormData] = useState({
        nombre_venta: '',
        trabajador: '',
        fecha: '',
        cliente: '',
        servicios: '',
    });
    const [showForm, setShowForm] = useState(false);

    const fetchVentas = async () => {
        try {
            const response = await fetch('/Integradora-CANESA-2/my-app/backend/getVentas.php');
            if (!response.ok) throw new Error('Error al obtener datos');
            const data = await response.json();
            setVentas(data);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };

    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('/Integradora-CANESA-2/my-app/backend/getTrabajadores.php');
            if (!response.ok) throw new Error('Error al obtener trabajadores');
            const data = await response.json();
            setTrabajadores(data);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
        }
    };

    useEffect(() => {
        fetchVentas();
        fetchTrabajadores();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/Integradora-CANESA-2/my-app/backend/procesar_ventas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, action: 'insert' }),
            });
            if (response.ok) {
                await fetchVentas();
                setFormData({ nombre_venta: '', trabajador: '', fecha: '', cliente: '', servicios: '' });
                setShowForm(false);
            } else {
                throw new Error('Error al agregar la venta');
            }
        } catch (error) {
            console.error('Error en el submit:', error);
        }
    };

    const handleDelete = async (nombre_venta) => {
        try {
            await fetch('/Integradora-CANESA-2/my-app/backend/procesar_ventas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_venta, action: 'delete' }),
            });
            await fetchVentas();
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
                        <label htmlFor="nombre_venta">Venta (Proyecto):</label>
                        <input
                            type="text"
                            id="nombre_venta"
                            name="nombre_venta"
                            value={formData.nombre_venta}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="trabajador">Trabajador:</label>
                        <select
                            id="trabajador"
                            name="trabajador"
                            value={formData.trabajador}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un trabajador</option>
                            {trabajadores.map((trabajador) => (
                                <option key={trabajador.id_trabajador} value={trabajador.id_trabajador}>
                                    {trabajador.nombre_trabajador}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="cliente">Cliente:</label>
                        <input
                            type="text"
                            id="cliente"
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="servicios">Servicios:</label>
                        <input
                            type="text"
                            id="servicios"
                            name="servicios"
                            value={formData.servicios}
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
                                <th>Venta</th>
                                <th>Trabajador</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Servicios</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta, index) => (
                                <tr key={index}>
                                    <td>{venta.nombre_venta}</td>
                                    <td>{venta.trabajador}</td>
                                    <td>{venta.fecha}</td>
                                    <td>{venta.cliente}</td>
                                    <td>{venta.servicios}</td>
                                    <td>
                                        <button onClick={() => handleDelete(venta.nombre_venta)}>Eliminar</button>
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

