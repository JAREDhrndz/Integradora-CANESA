import React, { useState, useEffect } from 'react';
import './GestionVentas.css';

const GestionVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]); // Estado para trabajadores
    const [formData, setFormData] = useState({
        nombre_venta: '',
        trabajador: '',
        fecha: '',
        cliente: '',
        servicios: '',
    });

    const fetchVentas = async () => {
        try {
            const response = await fetch('/Integradora-CANESA-2/my-app/backend/getVentas.php'); // URL actualizada
            if (!response.ok) throw new Error('Error al obtener datos');
            const data = await response.json();
            setVentas(data);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };

    const fetchTrabajadores = async () => {
        try {
            const response = await fetch('/Integradora-CANESA-2/my-app/backend/getTrabajadores.php'); // URL actualizada
            if (!response.ok) throw new Error('Error al obtener trabajadores');
            const data = await response.json();
            setTrabajadores(data);
        } catch (error) {
            console.error('Error fetching trabajadores:', error);
        }
    };

    useEffect(() => {
        fetchVentas();
        fetchTrabajadores(); // Llamar a la función para obtener trabajadores
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.name;

        try {
            const response = await fetch('/Integradora-CANESA-2/my-app/backend/procesar_ventas.php', { // URL actualizada
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, action }),
            });

            if (response.ok) {
                await fetchVentas(); // Refrescar la lista de ventas
                setFormData({ nombre_venta: '', trabajador: '', fecha: '', cliente: '', servicios: '' });
            } else {
                throw new Error('Error al procesar la venta');
            }
        } catch (error) {
            console.error('Error en el submit:', error);
        }
    };

    const handleDelete = async (nombre_venta) => {
        try {
            await fetch('/Integradora-CANESA-2/my-app/backend/procesar_ventas.php', { // URL actualizada
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_venta, action: 'delete' }),
            });
            await fetchVentas(); // Refrescar la lista de ventas
        } catch (error) {
            console.error('Error al eliminar venta:', error);
        }
    };

    return (
        <div id="gestion-ventas-container" className="container animate__animated animate__fadeIn">
            <img src="assets/Logo.png" alt="Logo Constructora Canese" id="logo" className="logo" />
            <h2 id="titulo-ventas">Registro de Ventas</h2>

            <form id="form-ventas" onSubmit={handleSubmit}>
                <label htmlFor="nombre_venta">Venta (Proyecto):</label>
                <input type="text" id="nombre_venta" name="nombre_venta" value={formData.nombre_venta} onChange={handleChange} required />

                <label htmlFor="trabajador">Trabajador:</label>
                <select id="trabajador" name="trabajador" value={formData.trabajador} onChange={handleChange} required>
                    <option value="">Selecciona un trabajador</option>
                    {trabajadores.map((trabajador) => (
                        <option key={trabajador.id_trabajador} value={trabajador.id_trabajador}>
                            {trabajador.nombre_trabajador}
                        </option>
                    ))}
                </select>

                <label htmlFor="fecha">Fecha:</label>
                <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required />

                <label htmlFor="cliente">Cliente:</label>
                <input type="text" id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} required />

                <label htmlFor="servicios">Servicios:</label>
                <input type="text" id="servicios" name="servicios" value={formData.servicios} onChange={handleChange} required />

                <div className="btn-group">
                    <input type="submit" name="insert" value="Agregar" />
                    <input type="submit" name="update" value="Actualizar" />
                </div>
            </form>

            <form id="form-eliminar-venta" onSubmit={(e) => { e.preventDefault(); handleDelete(formData.nombre_venta); }}>
                <label htmlFor="nombre_venta_eliminar">Venta (Proyecto a eliminar):</label>
                <input type="text" id="nombre_venta_eliminar" name="nombre_venta" required />
                <input type="submit" value="Eliminar" />
            </form>

            <table id="tabla-ventas">
                <thead>
                    <tr>
                        <th>Venta</th>
                        <th>Trabajador</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Servicios</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="back-button-container">
                <button className="btn-back" onClick={() => window.location.href='menu.html'}>
                    Regresar al Menú
                </button>
            </div>
        </div>
    );
};

export default GestionVentas;
