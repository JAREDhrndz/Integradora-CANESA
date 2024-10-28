<?php
include 'db.php'; // Conexion

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre']; // Captura el nombre enviado desde el formulario

    // Consulta para verificar si el usuario existe
    $sql = "SELECT * FROM trabajadores WHERE nombre = '$nombre'"; // Cambiar al nombre del campo
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // El usuario existe
        echo "Inicio de sesión exitoso"; // Mensaje de éxito para la prueba
    } else {
        // El usuario no existe
        echo "Usuario no encontrado";
    }
}

