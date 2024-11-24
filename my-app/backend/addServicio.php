<?php
header('Content-Type: application/json');

// Configuración de conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "canesa");

// Verificar conexión
if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

// Obtener datos enviados desde el cliente
$nombre = $_POST['Nombre'];
$descripcion = $_POST['Descripcion'];
$costo = $_POST['Costo'];

// Validar datos (asegurarse de que no estén vacíos)
if (empty($nombre) || empty($descripcion) || empty($costo)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit;
}

// Preparar la consulta SQL
$query = "INSERT INTO servicios (Nombre, Descripcion, Costo) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($query);

// Verificar si la consulta está bien preparada
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error al preparar la consulta: " . $conexion->error]);
    exit;
}

// Vincular parámetros y ejecutar
$stmt->bind_param("ssd", $nombre, $descripcion, $costo);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Servicio agregado exitosamente", "id" => $stmt->insert_id]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al agregar servicio: " . $stmt->error]);
}

// Cerrar conexiones
$stmt->close();
$conexion->close();
?>
