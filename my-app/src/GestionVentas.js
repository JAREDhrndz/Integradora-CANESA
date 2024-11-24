import React, { useState, useEffect } from 'react';
import './formularios.css'; 
import editIcon from './assets/icons/edit.png';
import deleteIcon from './assets/icons/delete.png'; 

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
      const response = await fetch(`http://localhost/backend/deleteVentas.php?id=${id}`, {
        method: 'GET',
      });

      const result = await response.json();

      if (result.status === "success") {
        setVentas((prevVentas) => prevVentas.filter((venta) => venta.Id !== id));
        console.log('Venta eliminada con éxito');
      } else {
        console.error('Error eliminando la venta:', result.message);
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
      const response = await fetch('http://localhost/backend/addVentas.php', {
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
    console.log('Datos que se van a enviar:', formData); // Verifica los datos que vas a enviar
    try {
        const response = await fetch(`http://localhost/backend/updateVentas.php?id=${ventaActual.Id}`, {
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
              id="Descripcion"
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleChange}
              required
            />
            
            <label htmlFor="Tipo_de_Pago">Tipo de Pago:</label>
            <select
              id="Tipo_de_Pago"
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
              id="Total_pagado"
              name="Total_pagado"
              value={formData.Total_pagado}
              onChange={handleChange}
              required
            />

            <label htmlFor="Fecha">Fecha:</label>
            <input
              type="datetime-local"
              id="Fecha"
              name="Fecha"
              value={formData.Fecha}
              onChange={handleChange}
              required
            />

            <label htmlFor="Num_usuario">Número de Usuario:</label>
            <input
              type="number"
              id="Num_usuario"
              name="Num_usuario"
              value={formData.Num_usuario}
              onChange={handleChange}
              required
            />

            <label htmlFor="Id_proveedor_servicio">ID Proveedor Servicio:</label>
            <input
              type="number"
              id="Id_proveedor_servicio"
              name="Id_proveedor_servicio"
              value={formData.Id_proveedor_servicio}
              onChange={handleChange}
              required
            />

            <label htmlFor="Num_empleado">Número de Empleado:</label>
            <input
              type="number"
              id="Num_empleado"
              name="Num_empleado"
              value={formData.Num_empleado}
              onChange={handleChange}
              required
            />

            <div className="btn-container-form">
              <button type="submit" className="btn-update">
                <span className="icon icon-1"></span>
                <span className="gradient-update"></span>
                <span className="gradient-update2"></span>
                <span className="insert-background"></span>
                <span className="button-update">{ventaActual ? 'Actualizar Venta' : 'Agregar Venta'}</span>
              </button>

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
            <th>ID</th>
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
  {ventas.length > 0 ? (
    ventas.map((venta) => (
      <tr key={venta.Id}>  {/* Usando Id como key única */}
        <td>{venta.Id}</td>
        <td>{venta.Descripcion}</td>
        <td>{venta.Tipo_de_Pago}</td>
        <td>{venta.Total_pagado}</td>
        <td>{venta.Fecha}</td>
        <td>{venta.Num_usuario}</td>
        <td>{venta.Id_proveedor_servicio}</td>
        <td>{venta.Num_empleado}</td>
        <td>
          <div className="btn-actions">
            <button
              className="btn-icon"
              onClick={() => handleUpdate(venta)}
            >
              <img
                className="icon-action"
                src={editIcon}
                alt="Editar"
              />
            </button>
            <button
              className="btn-icon"
              onClick={() => handleDelete(venta.Id)}
            >
              <img
                className="icon-action"
                src={deleteIcon}
                alt="Eliminar"
              />
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">No hay ventas registradas</td>
    </tr>
  )}
</tbody>

        </table>
      )}
    </div>
  );
};

export default GestionVentas;
