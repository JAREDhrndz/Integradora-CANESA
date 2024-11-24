import React, { useState, useEffect } from 'react';
import './formularios.css';  
import editIcon from './assets/icons/edit.png';
import deleteIcon from './assets/icons/delete.png';

const GestionServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: '',
    Costo: '',
  });
  const [servicioActual, setServicioActual] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Función para cargar los servicios
  const fetchServicios = async () => {
    try {
      const response = await fetch('http://localhost/backend/getServicios.php');
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  // Cargar los servicios cuando el componente se monte
  useEffect(() => {
    fetchServicios();
  }, []); // Solo se ejecuta al montar el componente

  // Función para eliminar un servicio
  const handleDelete = async (id) => {
    console.log("Eliminar servicio con ID:", id);
    try {
      const response = await fetch('http://localhost/backend/deleteServicio.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id }),
      });
  
      if (response.ok) {
        console.log("Servicio eliminado exitosamente");
        fetchServicios();
      } else {
        const errorData = await response.json();
        console.error('Detalles del error:', errorData);
      }
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
    }
  };
  
  

  const handleUpdate = (servicio) => {
    setServicioActual(servicio);
    setFormData({
      Nombre: servicio.Nombre,
      Descripcion: servicio.Descripcion,
      Costo: servicio.Costo,
    });
    setMostrarFormulario(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Muestra los datos que vas a enviar al backend
    console.log('Datos enviados al backend:', formData);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Nombre', formData.Nombre);
      formDataToSend.append('Descripcion', formData.Descripcion);
      formDataToSend.append('Costo', formData.Costo);
  
      const response = await fetch('http://localhost/backend/addServicio.php', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setServicios([...servicios, { ...formData, Id: data.id }]);
          setFormData({ Nombre: '', Descripcion: '', Costo: '' });
        } else {
          console.error('Error del servidor:', data.message);
        }
      } else {
        console.error('Error al insertar el servicio');
      }
    } catch (error) {
      console.error('Error al enviar el servicio:', error);
    }
  };
  
  

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      nombre: servicioActual.nombre,
      descripcion: servicioActual.descripcion,
      costo: servicioActual.costo,
      id: servicioActual.Id
    };
  
    try {
      const response = await fetch(`http://localhost/backend/updateServicio.php?id=${servicioActual.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Asegúrate de que los datos sean JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          setServicios(
            servicios.map((servicio) =>
              servicio.Id === servicioActual.Id ? { ...servicio, ...formData } : servicio
            )
          );
          setMostrarFormulario(false);
          setServicioActual(null);
        } else {
          console.error('Error al actualizar el servicio');
        }
      } else {
        console.error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
    }
  };
  
  

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setServicioActual(null);
  };

  return (
    <div id="gestion-servicios" className="container">
      <h1 id="titulo-servicios" className="title">Gestión de Servicios</h1>

      <div className="btn-container">
        {!mostrarFormulario && (
          <button className="btn-add" onClick={toggleFormulario}>
            <span className="icon icon-1"></span>
            <span className="gradient-insert"></span>
            <span className="gradient-insert2"></span>
            <span className="insert-background"></span>
            <span className="button-insert">Insertar Servicio</span> 
          </button>
        )}
      </div>

      {mostrarFormulario && (
        <div className="form-add-update">
          <h2 className="title">{servicioActual ? 'Actualizar Servicio' : 'Agregar Nuevo Servicio'}</h2>
          <form onSubmit={servicioActual ? handleUpdateSubmit : handleSubmit}>
  <label htmlFor="Nombre">Nombre del Servicio:</label>
  <input
    type="text"
    id="Nombre" // ID agregado
    name="Nombre"
    value={formData.Nombre}
    onChange={handleChange}
    required
  />

  <label htmlFor="Descripcion">Descripción:</label>
  <input
    type="text"
    id="Descripcion" // ID agregado
    name="Descripcion"
    value={formData.Descripcion}
    onChange={handleChange}
    required
  />

  <label htmlFor="Costo">Costo:</label>
  <input
    type="number"
    id="Costo" // ID agregado
    name="Costo"
    value={formData.Costo}
    onChange={handleChange}
    required
  />

  <div className="btn-container-form">
    <button type="submit" className="btn-update">
      <span className="icon icon-1"></span>
      <span className="gradient-update"></span>
      <span className="gradient-update2"></span>
      <span className="insert-background"></span>
      <span className="button-update">{servicioActual ? 'Actualizar Servicio' : 'Agregar Servicio'}</span>
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
              <th className="column-id">ID</th>
              <th className="column-nombre">Nombre</th>
              <th className="column-descripcion">Descripción</th>
              <th className="column-costo">Costo</th>
              <th className="column-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.length > 0 ? (
              servicios.map((servicio) => (
                <tr key={servicio.Id}>
                  <td>{servicio.Id}</td>
                  <td>{servicio.Nombre}</td>
                  <td>{servicio.Descripcion}</td>
                  <td>{servicio.Costo}</td>
                  <td>
                    <div className="btn-actions">
                      <button
                        className="btn-icon"
                        onClick={() => handleUpdate(servicio)}
                      >
                        <img src={editIcon} alt="Editar" />
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => handleDelete(servicio.Id)}
                      >
                        <img src={deleteIcon} alt="Eliminar" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay servicios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionServicios;
