import React, { useState, useEffect } from 'react';
import './formularios.css';  // Asegúrate de que esta línea esté correcta

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: '',
    Correo: '',
    Telefono: '',
    Direccion: '',
    Fecha_nacimiento: '',
    Tipo_usuario: 'Regular',
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/backend/delUsuarios.php?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsuarios(usuarios.filter((usuario) => usuario.Id !== id));
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
      Correo: usuario.Correo,
      Telefono: usuario.Telefono,
      Direccion: usuario.Direccion,
      Fecha_nacimiento: usuario.Fecha_nacimiento,
      Tipo_usuario: usuario.Tipo_usuario,
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
      const response = await fetch('http://localhost/backend/insertUsuario.php', {
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
          Correo: '',
          Telefono: '',
          Direccion: '',
          Fecha_nacimiento: '',
          Tipo_usuario: 'Regular',
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
      const response = await fetch(`http://localhost/backend/updateUsuario.php?id=${usuarioActual.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setUsuarios(usuarios.map((usuario) =>
          usuario.Id === usuarioActual.Id ? { ...usuario, ...formData } : usuario
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
            <label htmlFor="Nombre">Nombre:</label>
            <input
              type="text"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              required
            />

            <label htmlFor="Correo">Correo:</label>
            <input
              type="email"
              name="Correo"
              value={formData.Correo}
              onChange={handleChange}
              required
            />

            <label htmlFor="Telefono">Teléfono:</label>
            <input
              type="tel"
              name="Telefono"
              value={formData.Telefono}
              onChange={handleChange}
              required
            />

            <label htmlFor="Direccion">Dirección:</label>
            <input
              type="text"
              name="Direccion"
              value={formData.Direccion}
              onChange={handleChange}
              required
            />

            <label htmlFor="Fecha_nacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="Fecha_nacimiento"
              value={formData.Fecha_nacimiento}
              onChange={handleChange}
              required
            />

            <label htmlFor="Tipo_usuario">Tipo de Usuario:</label>
            <select
              name="Tipo_usuario"
              value={formData.Tipo_usuario}
              onChange={handleChange}
            >
              <option value="Regular">Regular</option>
              <option value="Administrador">Administrador</option>
            </select>

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
              <th className="column-fecha-nacimiento">Fecha de Nacimiento</th>
              <th className="column-tipo-usuario">Tipo de Usuario</th>
              <th className="column-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.Id}>
                  <td>{usuario.Id}</td>
                  <td>{usuario.Nombre}</td>
                  <td>{usuario.Correo}</td>
                  <td>{usuario.Telefono}</td>
                  <td>{usuario.Direccion}</td>
                  <td>{usuario.Fecha_nacimiento}</td>
                  <td>{usuario.Tipo_usuario}</td>
                  <td>
                    <button onClick={() => handleUpdate(usuario)} className="btn-edit">Editar</button>
                    <button onClick={() => handleDelete(usuario.Id)} className="btn-delete">Eliminar</button>
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
