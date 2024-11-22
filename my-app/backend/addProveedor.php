<?php
header('Content-Type: application/json');

$conexion = new mysqli("localhost", "root", "", "canesa");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

$nombre = $_POST['nombre'];
$correo_electronico = $_POST['correo_electronico'];
$telefono = $_POST['telefono'];
$detalles = $_POST['detalles'];

$query = "INSERT INTO proveedores (Nombre, Correo_Electronico, Telefono, Detalles) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($query);
$stmt->bind_param("ssss", $nombre, $correo_electronico, $telefono, $detalles);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Proveedor agregado exitosamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al agregar proveedor"]);
}

$stmt->close();
$conexion->close();
?>
