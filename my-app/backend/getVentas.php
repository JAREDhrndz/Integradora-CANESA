<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *"); // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Permite estos métodos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permite estos encabezados
header("Access-Control-Allow-Credentials: true");

// Conectar a la base de datos
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'canesa';

$conn = new mysqli($host, $user, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener las ventas
$sql = "SELECT v.Id, v.Descripcion, v.Tipo_de_Pago, v.Total_pagado, v.Fecha, 
               u.Nombre AS Usuario, ps.Num_proveedor, e.Nombre AS Empleado
        FROM ventas v
        INNER JOIN usuarios u ON v.Num_usuario = u.Num_Usuario
        INNER JOIN provedor_servicio ps ON v.Id_proveedor_servicio = ps.Id_pro_serv
        INNER JOIN trabajadores e ON v.Num_empleado = e.Numero_empleado";

$result = $conn->query($sql);

$ventas = [];

if ($result->num_rows > 0) {
    // Recuperar todas las filas de la consulta
    while ($row = $result->fetch_assoc()) {
        $ventas[] = $row;
    }
    echo json_encode($ventas); // Devolver los datos como JSON
} else {
    echo json_encode([]); // Si no hay datos, devolver un arreglo vacío
}

// Cerrar la conexión
$conn->close();
?>
