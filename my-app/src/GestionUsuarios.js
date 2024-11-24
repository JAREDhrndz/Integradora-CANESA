import editIcon from './assets/icons/edit.png';
import deleteIcon from './assets/icons/delete.png';

import React, { useState, useEffect } from 'react';
import './formularios.css';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: '',
    Correo_Electronico: '',
    Telefono: '',
    Direccion: '',
    Tipo_usuario: 'Cliente',
    Contraseña: '',
  });
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost/backend/getUsuarios.php');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (numUsuario) => {
    try {
      const response = await fetch(`http://localhost/backend/deleteUsuario.php?Num_usuario=${numUsuario}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setUsuarios(usuarios.filter((usuario) => usuario.Num_Usuario !== numUsuario));
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleUpdate = (usuario) => {
    setUsuarioActual(usuario);
    setFormData({
      Nombre: usuario.Nombre,
      Correo_Electronico: usuario.Correo_Electronico,
      Telefono: usuario.Telefono,
      Direccion: usuario.Direccion,
      Tipo_usuario: usuario.Tipo_usuario,
      Contraseña: '', // Para la actualización no queremos mostrar la contraseña existente
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
    try {
      const response = await fetch('http://localhost/backend/addUsuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newUsuario = await response.json();
        setUsuarios([...usuarios, newUsuario]);
        setFormData({
          Nombre: '',
          Correo_Electronico: '',
          Telefono: '',
          Direccion: '',
          Tipo_usuario: 'Cliente',
          Contraseña: '', // Limpiar el campo contraseña después de agregar
        });
      } else {
        console.error('Error al insertar el usuario');
      }
    } catch (error) {
      console.error('Error al enviar el usuario:', error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost/backend/updateUsuario.php?numUsuario=${usuarioActual.Num_Usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setUsuarios(usuarios.map((usuario) =>
          usuario.Num_Usuario === usuarioActual.Num_Usuario ? { ...usuario, ...formData } : usuario
        ));
        setMostrarFormulario(false);
        setUsuarioActual(null);
      } else {
        console.error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setUsuarioActual(null);
  };

  return (
    <div id="gestion-usuarios" className="container">
      <h1 id="titulo-usuarios" className="title">Gestión de Usuarios</h1>
      
      <div className="btn-container">
        {!mostrarFormulario && (
          <button className="btn-add" onClick={toggleFormulario}>
            <span className="icon icon-1"></span>
            <span className="gradient-insert"></span>
            <span className="gradient-insert2"></span>
            <span className="insert-background"></span>
            <span className="button-insert">Insertar Usuario</span>
          </button>
        )}
      </div>

      {mostrarFormulario && (
        <div className="form-add-update">
          <h2 className="title">{usuarioActual ? 'Actualizar Usuario' : 'Agregar Nuevo Usuario'}</h2>
          <form onSubmit={usuarioActual ? handleUpdateSubmit : handleSubmit}>
            <label htmlFor="input-nombre">Nombre:</label>
            <input
              id="input-nombre"
              type="text"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              required
            />

            <label htmlFor="input-correo">Correo:</label>
            <input
              id="input-correo"
              type="email"
              name="Correo_Electronico"
              value={formData.Correo_Electronico}
              onChange={handleChange}
              required
            />

            <label htmlFor="input-telefono">Teléfono:</label>
            <input
              id="input-telefono"
              type="tel"
              name="Telefono"
              value={formData.Telefono}
              onChange={handleChange}
              required
            />

            <label htmlFor="input-direccion">Dirección:</label>
            <input
              id="input-direccion"
              type="text"
              name="Direccion"
              value={formData.Direccion}
              onChange={handleChange}
              required
            />

            <label htmlFor="input-tipo-usuario">Tipo de Usuario:</label>
            <select
              id="input-tipo-usuario"
              name="Tipo_usuario"
              value={formData.Tipo_usuario}
              onChange={handleChange}
            >
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
              <option value="SuperAdministrador">SuperAdministrador</option>
            </select>

            <label htmlFor="input-contraseña">Contraseña:</label>
            <input
              id="input-contraseña"
              type="password"
              name="Contraseña"
              value={formData.Contraseña}
              onChange={handleChange}
              required
            />

            <div className="btn-container-form">
              <button type="submit" className="btn-update">
                <span className="icon icon-1"></span>
                <span className="gradient-update"></span>
                <span className="gradient-update2"></span>
                <span className="insert-background"></span>
                <span className="button-update">{usuarioActual ? 'Actualizar Usuario' : 'Agregar Usuario'}</span>
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
    <th className="column-correo">Correo</th>
    <th className="column-telefono">Teléfono</th>
    <th className="column-direccion">Dirección</th>
    <th className="column-tipo-usuario">Tipo de Usuario</th>
    <th className="column-contraseña">Contraseña</th>
    <th className="column-acciones">Acciones</th>
  </tr>
</thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.Num_Usuario}>
                  <td>{usuario.Num_Usuario}</td>
                  <td>{usuario.Nombre}</td>
                  <td>{usuario.Correo_Electronico}</td>
                  <td>{usuario.Telefono}</td>
                  <td>{usuario.Direccion}</td>
                  <td>{usuario.Tipo_usuario}</td>
                  <td>********</td> {/* Mostramos un texto en lugar de la contraseña */}
                  <td>
                    <button onClick={() => handleUpdate(usuario)} className="btn-icon">
                      <img src={editIcon} alt="Editar" />
                    </button>
                    <button onClick={() => handleDelete(usuario.Num_Usuario)} className="btn-icon">
                      <img src={deleteIcon} alt="Eliminar" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No hay usuarios registrados.</td>
                </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionUsuarios;
