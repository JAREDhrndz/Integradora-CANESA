<?php
// registrarCita.php

// Habilitar el manejo de errores para depuración (desactivar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Conexión a la base de datos (ajusta estos parámetros según tu configuración)
$host = 'localhost'; // Cambia esto por tu host
$user = 'root';      // Cambia esto por tu usuario de base de datos
$password = '';      // Cambia esto por tu contraseña de base de datos
$database = 'canesa'; // Cambia esto por el nombre de tu base de datos

$conn = new mysqli($host, $user, $password, $database);

// Verifica la conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Verifica que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibe y valida los datos del formulario
    $nombre = isset($_POST['nombre']) ? $conn->real_escape_string(trim($_POST['nombre'])) : null;
    $telefono = isset($_POST['telefono']) ? $conn->real_escape_string(trim($_POST['telefono'])) : null;
    $descripcion = isset($_POST['descripcion']) ? $conn->real_escape_string(trim($_POST['descripcion'])) : null;
    $servicio = isset($_POST['servicio']) ? intval($_POST['servicio']) : null;

    // Verifica que todos los campos requeridos estén completos
    if ($nombre && $telefono && $descripcion && $servicio) {
        // Inserta los datos en la base de datos
        $sql = "INSERT INTO citas (nombre, telefono, descripcion, servicio_id) 
                VALUES ('$nombre', '$telefono', '$descripcion', $servicio)";

        if ($conn->query($sql) === TRUE) {
            echo "Cita registrada con éxito.";
        } else {
            echo "Error al registrar la cita: " . $conn->error;
        }
    } else {
        echo "Por favor, completa todos los campos.";
    }
} else {
    echo "Método no permitido.";
}

// Cierra la conexión a la base de datos
$conn->close();
?>
