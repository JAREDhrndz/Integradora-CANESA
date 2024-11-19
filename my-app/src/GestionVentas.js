import React, { useState, useEffect } from 'react';
import './GestionVentas.css';

const GestionVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [formData, setFormData] = useState({
    Descripcion: '',
    Tipo_de_Pago: 'Efectivo',
    Total_pagado: '',
    Fecha: '',
    Num_usuario: '',
    Id_proveedor_servicio: '',
    Num_empleado: ''
  });
  const [ventaActual, setVentaActual] = useState(null); // Estado para almacenar la venta que se va a actualizar
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar u ocultar el formulario

  useEffect(() => {
    // Función para obtener las ventas desde la API
    const fetchVentas = async () => {
      try {
        const response = await fetch('http://localhost/backend/getVentas.php');
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    fetchVentas(); // Llamar a la función al cargar el componente
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/backend/delVentas.php?id=${id}`, {
        method: 'DELETE', // Método DELETE para eliminar la venta
      });
      if (response.ok) {
        setVentas(ventas.filter((venta) => venta.Id !== id)); // Eliminar la venta del estado si es exitosa
      } else {
        console.error('Error al eliminar la venta');
      }
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  const handleUpdate = (venta) => {
    // Al hacer clic en "Actualizar", mostrar el formulario y rellenarlo con los datos de la venta seleccionada
    setVentaActual(venta); // Establecer la venta a actualizar
    setFormData({
      Descripcion: venta.Descripcion,
      Tipo_de_Pago: venta.Tipo_de_Pago,
      Total_pagado: venta.Total_pagado,
      Fecha: venta.Fecha,
      Num_usuario: venta.Num_usuario,
      Id_proveedor_servicio: venta.Id_proveedor_servicio,
      Num_empleado: venta.Num_empleado
    });
    setMostrarFormulario(true); // Mostrar el formulario
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost/backend/insertVenta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newVenta = await response.json();
        setVentas([...ventas, newVenta]); // Agregar la nueva venta al estado
        setFormData({
          Descripcion: '',
          Tipo_de_Pago: 'Efectivo',
          Total_pagado: '',
          Fecha: '',
          Num_usuario: '',
          Id_proveedor_servicio: '',
          Num_empleado: ''
        }); // Limpiar el formulario después de la inserción
      } else {
        console.error('Error al insertar la venta');
      }
    } catch (error) {
      console.error('Error al enviar la venta:', error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost/backend/updateVenta.php?id=${ventaActual.Id}`, {
        method: 'PUT', // Método PUT para actualizar el registro
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Actualizar la venta en el estado local después de la actualización exitosa
        setVentas(ventas.map(venta => 
          venta.Id === ventaActual.Id ? { ...venta, ...formData } : venta
        ));
        setMostrarFormulario(false); // Ocultar el formulario después de la actualización
        setVentaActual(null); // Limpiar la venta actual
      } else {
        console.error('Error al actualizar la venta');
      }
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
    }
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario); // Cambiar el estado de mostrarFormulario
    setVentaActual(null); // Limpiar la venta actual si se cierra el formulario
  };

  return (
    <div id="gestion-ventas">
      <h1 id="titulo-ventas">Gestión de Ventas</h1>
      
      {/* Botón para mostrar el formulario */}
      {!mostrarFormulario && (
        <button id="btn-insertar" onClick={toggleFormulario}>Insertar Registro</button>
      )}

      {/* Formulario para insertar o actualizar un registro */}
      {mostrarFormulario && (
        <div id="form-venta">
          <h2 id="titulo-form">{ventaActual ? 'Actualizar Venta' : 'Agregar Nueva Venta'}</h2>
          <form onSubmit={ventaActual ? handleUpdateSubmit : handleSubmit}>
            <label htmlFor="Descripcion">Descripción:</label>
            <input
              id="input-descripcion"
              type="text"
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleChange}
              required
            />
            
            <label htmlFor="Tipo_de_Pago">Tipo de Pago:</label>
            <select
              id="input-tipo-pago"
              name="Tipo_de_Pago"
              value={formData.Tipo_de_Pago}
              onChange={handleChange}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>

            <label htmlFor="Total_pagado">Total Pagado:</label>
            <input
              id="input-total-pagado"
              type="number"
              name="Total_pagado"
              value={formData.Total_pagado}
              onChange={handleChange}
              required
            />

            <label htmlFor="Fecha">Fecha:</label>
            <input
              id="input-fecha"
              type="datetime-local"
              name="Fecha"
              value={formData.Fecha}
              onChange={handleChange}
              required
            />

            <label htmlFor="Num_usuario">Número de Usuario:</label>
            <input
              id="input-num-usuario"
              type="number"
              name="Num_usuario"
              value={formData.Num_usuario}
              onChange={handleChange}
              required
            />

            <label htmlFor="Id_proveedor_servicio">ID Proveedor Servicio:</label>
            <input
              id="input-id-proveedor-servicio"
              type="number"
              name="Id_proveedor_servicio"
              value={formData.Id_proveedor_servicio}
              onChange={handleChange}
              required
            />

            <label htmlFor="Num_empleado">Número de Empleado:</label>
            <input
              id="input-num-empleado"
              type="number"
              name="Num_empleado"
              value={formData.Num_empleado}
              onChange={handleChange}
              required
            />

            <button type="submit" id="btn-agregar-venta">{ventaActual ? 'Actualizar Venta' : 'Agregar Venta'}</button>
            <button type="button" id="btn-regresar-lista" onClick={toggleFormulario}>Regresar a la lista</button>
          </form>
        </div>
      )}

      {/* Tabla de ventas */}
      {!mostrarFormulario && (
        <table id="tabla-ventas">
          <thead>
            <tr>
              <th id="columna-id">ID</th>
              <th id="columna-descripcion">Descripción</th>
              <th id="columna-tipo-pago">Tipo de Pago</th>
              <th id="columna-total">Total Pagado</th>
              <th id="columna-fecha">Fecha</th>
              <th id="columna-usuario">Usuario</th>
              <th id="columna-proveedor">Proveedor</th>
              <th id="columna-empleado">Empleado</th>
              <th id="columna-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta) => (
                <tr key={venta.Id}>
                  <td id="id-venta">{venta.Id}</td>
                  <td id="descripcion-venta">{venta.Descripcion}</td>
                  <td id="tipo-pago-venta">{venta.Tipo_de_Pago}</td>
                  <td id="total-pagado-venta">{venta.Total_pagado}</td>
                  <td id="fecha-venta">{venta.Fecha}</td>
                  <td id="usuario-venta">{venta.Num_usuario}</td>
                  <td id="proveedor-venta">{venta.Id_proveedor_servicio}</td>
                  <td id="empleado-venta">{venta.Num_empleado}</td>
                  <td id="acciones-venta">
                    <button onClick={() => handleUpdate(venta)} id="btn-editar">Actualizar</button>
                    <button onClick={() => handleDelete(venta.Id)} id="btn-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No hay ventas registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionVentas;
