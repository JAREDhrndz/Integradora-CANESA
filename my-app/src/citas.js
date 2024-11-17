import React, { useState, useEffect } from 'react';
import './citas.css';

const Citas = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [servicio, setServicio] = useState('');
  const [servicios, setServicios] = useState([]);

  // Simula la carga de servicios desde la base de datos
  useEffect(() => {
    const cargarServicios = async () => {
      // Sustituye este array con tu llamada a la base de datos para cargar los servicios
      const serviciosSimulados = [
        { id: 1, nombre: 'Ejemplo1' },
        { id: 2, nombre: 'Ejemplo2' },
        { id: 3, nombre: 'Ejemplo3' },
        { id: 4, nombre: 'Ejemplo4' },
      ];
      setServicios(serviciosSimulados);
    };

    cargarServicios();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const nuevaCita = { nombre, telefono, descripcion, servicio };

    // Enviar los datos al backend (PHP)
    const response = await fetch('registrarCita.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(nuevaCita).toString(),
    });

    const data = await response.text();
    console.log('Respuesta del servidor:', data);
  };

  return (
    <div id="citas-container">
      <h2 id="citas-titulo">Registrar Cita</h2>
      <form id="citas-formulario" onSubmit={manejarEnvio}>
        <div id="citas-nombre-container">
          <label id="citas-nombre-label" htmlFor="citas-nombre-input">Nombre:</label>
          <input
            id="citas-nombre-input"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div id="citas-telefono-container">
          <label id="citas-telefono-label" htmlFor="citas-telefono-input">Teléfono:</label>
          <input
            id="citas-telefono-input"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div id="citas-descripcion-container">
          <label id="citas-descripcion-label" htmlFor="citas-descripcion-input">Descripción:</label>
          <textarea
            id="citas-descripcion-input"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div id="citas-servicio-container">
          <label id="citas-servicio-label" htmlFor="citas-servicio-select">Servicio:</label>
          <select
            id="citas-servicio-select"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((serv) => (
              <option key={serv.id} value={serv.id}>
                {serv.nombre}
              </option>
            ))}
          </select>
        </div>
        <button id="citas-boton-registrar" type="submit">Registrar Cita</button>
      </form>
    </div>
  );
};

export default Citas;
