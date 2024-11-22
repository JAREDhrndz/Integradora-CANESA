<?php
header('Content-Type: application/json');

$conexion = new mysqli("localhost", "root", "", "canesa");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

$nombre = $_POST['nombre'];

$query = "DELETE FROM proveedores WHERE Nombre = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $nombre);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Proveedor eliminado exitosamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al eliminar proveedor"]);
}

$stmt->close();
$conexion->close();
?>

