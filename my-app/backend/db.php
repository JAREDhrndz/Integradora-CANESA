<?php
$host = 'localhost';
$user = 'usuario'; // Cambiar
$password = ''; // Cambiar
$dbname = 'mi_base_datos'; // Cambiar

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

