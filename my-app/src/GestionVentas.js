import React, { useState, useEffect } from 'react';
import './formularios.css';  // Asegúrate de que esta línea esté correcta

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
  const [ventaActual, setVentaActual] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch('http://localhost/backend/getVentas.php');
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };
    fetchVentas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/backend/delVentas.php?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setVentas(ventas.filter((venta) => venta.Id !== id));
      } else {
        console.error('Error al eliminar la venta');
      }
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  const handleUpdate = (venta) => {
    setVentaActual(venta);
    setFormData({
      Descripcion: venta.Descripcion,
      Tipo_de_Pago: venta.Tipo_de_Pago,
      Total_pagado: venta.Total_pagado,
      Fecha: venta.Fecha,
      Num_usuario: venta.Num_usuario,
      Id_proveedor_servicio: venta.Id_proveedor_servicio,
      Num_empleado: venta.Num_empleado
    });
    setMostrarFormulario(true);
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
        setVentas([...ventas, newVenta]);
        setFormData({
          Descripcion: '',
          Tipo_de_Pago: 'Efectivo',
          Total_pagado: '',
          Fecha: '',
          Num_usuario: '',
          Id_proveedor_servicio: '',
          Num_empleado: ''
        });
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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setVentas(ventas.map(venta => 
          venta.Id === ventaActual.Id ? { ...venta, ...formData } : venta
        ));
        setMostrarFormulario(false);
        setVentaActual(null);
      } else {
        console.error('Error al actualizar la venta');
      }
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
    }
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setVentaActual(null);
  };

  return (
    <div id="gestion-ventas" className="container">
      <h1 id="titulo-ventas" className="title">Gestión de Ventas</h1>
      

      <div className="btn-container">
          {!mostrarFormulario && (
            <button className="btn-add" onClick={toggleFormulario}>
              <span className="icon icon-1"></span>
              <span className="gradient-insert"></span>
              <span className="gradient-insert2"></span>
              <span className="insert-background"></span>
              <span className="button-insert">Insertar Registro</span> 
            </button>
         )}
      </div>

      {mostrarFormulario && (
        <div className="form-add-update">
          <h2 className="title">{ventaActual ? 'Actualizar Venta' : 'Agregar Nueva Venta'}</h2>
          <form onSubmit={ventaActual ? handleUpdateSubmit : handleSubmit}>
            <label htmlFor="Descripcion">Descripción:</label>
            <input
              type="text"
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleChange}
              required
            />
            
            <label htmlFor="Tipo_de_Pago">Tipo de Pago:</label>
            <select
              name="Tipo_de_Pago"
              value={formData.Tipo_de_Pago}
              onChange={handleChange}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>

            <label htmlFor="Total_pagado">Total Pagado:</label>
            <input
              type="number"
              name="Total_pagado"
              value={formData.Total_pagado}
              onChange={handleChange}
              required
            />

            <label htmlFor="Fecha">Fecha:</label>
            <input
              type="datetime-local"
              name="Fecha"
              value={formData.Fecha}
              onChange={handleChange}
              required
            />

            <label htmlFor="Num_usuario">Número de Usuario:</label>
            <input
              type="number"
              name="Num_usuario"
              value={formData.Num_usuario}
              onChange={handleChange}
              required
            />

            <label htmlFor="Id_proveedor_servicio">ID Proveedor Servicio:</label>
            <input
              type="number"
              name="Id_proveedor_servicio"
              value={formData.Id_proveedor_servicio}
              onChange={handleChange}
              required
            />

            <label htmlFor="Num_empleado">Número de Empleado:</label>
            <input
              type="number"
              name="Num_empleado"
              value={formData.Num_empleado}
              onChange={handleChange}
              required
            />

<div className="btn-container-form">
  {/* Botón de Agregar o Actualizar Venta */}
  <button type="submit" className="btn-update">
    <span className="icon icon-1"></span>
    <span className="gradient-update"></span>
    <span className="gradient-update2"></span>
    <span className="insert-background"></span>
    <span className="button-update">{ventaActual ? 'Actualizar Venta' : 'Agregar Venta'}</span>
  </button>

  {/* Botón de Regresar a la lista */}
  <button type="button" className="btn-add" onClick={toggleFormulario}>
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

      {!mostrarFormulario && (
        <table className="table-general">
          <thead>
            <tr>
              <th className="column-id">ID</th>
              <th className="column-descripcion">Descripción</th>
              <th className="column-tipo-pago">Tipo de Pago</th>
              <th className="column-total">Total Pagado</th>
              <th className="column-fecha">Fecha</th>
              <th className="column-usuario">Usuario</th>
              <th className="column-proveedor">Proveedor</th>
              <th className="column-empleado">Empleado</th>
              <th className="column-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((venta) => (
                <tr key={venta.Id}>
                  <td>{venta.Id}</td>
                  <td>{venta.Descripcion}</td>
                  <td>{venta.Tipo_de_Pago}</td>
                  <td>{venta.Total_pagado}</td>
                  <td>{venta.Fecha}</td>
                  <td>{venta.Num_usuario}</td>
                  <td>{venta.Id_proveedor_servicio}</td>
                  <td>{venta.Num_empleado}</td>
                  <td>
                    <button onClick={() => handleUpdate(venta)} className="btn-edit">Editar</button>
                    <button onClick={() => handleDelete(venta.Id)} className="btn-delete">Eliminar</button>
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

