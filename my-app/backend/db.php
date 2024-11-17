<?php
$host = 'localhost';
$user = 'root'; // Nombre de usuario predeterminado para XAMPP
$password = ''; // Contraseña predeterminada (vacía)
$dbname = 'canesa'; // Cambiar al nombre de tu base de datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    error_log("Conexión fallida: " . $conn->connect_error); // Registra el error en el archivo de log
    die("Error en la conexión a la base de datos. Por favor, inténtalo más tarde.");
}

// Opcional: Configuración de conjunto de caracteres
$conn->set_charset("utf8mb4"); // Configura el juego de caracteres a UTF-8

// Resto del código que necesites para interactuar con la base de datos
?>
