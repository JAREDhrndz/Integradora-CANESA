import React from 'react';

const GestionProveedores = () => {
    return (
        <div id="container" className="animate__animated animate__fadeIn">
            <img 
                id="logo" 
                src="assets/Logo.png" 
                alt="Logo Constructora Canese" 
            />
            <h2 id="title">Registro de Proveedores</h2>

            {/* Formulario para agregar/actualizar proveedores */}
            <form id="form-add-update" action="procesar_proveedores.php" method="POST">
                <label id="label-nombre-proveedor">Nombre del Proveedor:</label>
                <input id="input-nombre-proveedor" type="text" name="nombre_proveedor" required />

                <label id="label-contacto">Contacto (Email):</label>
                <input id="input-contacto" type="email" name="contacto" required />

                <label id="label-telefono">Teléfono:</label>
                <input id="input-telefono" type="tel" name="telefono" required />

                <input id="submit-agregar" type="submit" name="insert" value="Agregar" />
                <input id="submit-actualizar" type="submit" name="update" value="Actualizar" />
            </form>

            {/* Formulario para eliminar proveedores */}
            <form id="form-delete" action="procesar_proveedores.php" method="POST">
                <label id="label-eliminar-nombre-proveedor">Nombre del Proveedor (para eliminar):</label>
                <input id="input-eliminar-nombre-proveedor" type="text" name="nombre_proveedor" required />
                <input id="submit-eliminar" type="submit" name="delete" value="Eliminar" />
            </form>

            {/* Tabla de proveedores */}
            <table id="tabla-proveedores">
                <thead>
                    <tr>
                        <th id="th-proveedor">Proveedor</th>
                        <th id="th-contacto">Contacto</th>
                        <th id="th-telefono">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí se agregarán las filas dinámicamente */}
                </tbody>
            </table>

            {/* Botón de regreso al menú */}
            <div id="back-button-container">
                <button 
                    id="btn-back" 
                    onClick={() => window.location.href='menu.html'}
                >
                    Regresar al Menú
                </button>
            </div>
        </div>
    );
};

export default GestionProveedores;