<?php
header('Content-Type: application/json');

$conexion = new mysqli("localhost", "root", "", "canesa");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

$id_servicio = $_POST['id'];
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$costo = $_POST['costo'];

$query = "UPDATE servicios SET Nombre = ?, Descripcion = ?, Costo = ? WHERE Id = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("ssdi", $nombre, $descripcion, $costo, $id_servicio);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Servicio actualizado exitosamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al actualizar el servicio"]);
}

$stmt->close();
$conexion->close();
?>
