<?php
header('Content-Type: application/json');

$conexion = new mysqli("localhost", "root", "", "canesa");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

$query = "SELECT * FROM proveedores";
$result = $conexion->query($query);

$proveedores = [];
while ($row = $result->fetch_assoc()) {
    $proveedores[] = $row;
}

echo json_encode($proveedores);

$conexion->close();
?>
