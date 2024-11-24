<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'canesa';
$user = 'root';
$password = '';

$conexion = new mysqli($host, $user, $password, $db);

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

$id = $_POST['id'];

if (empty($id)) {
    echo json_encode(["status" => "error", "message" => "No se proporcionó un ID válido"]);
    exit;
}

$query = "DELETE FROM trabajadores WHERE Numero_empleado = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Trabajador eliminado correctamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No se encontró el trabajador"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Error al eliminar trabajador"]);
}

$stmt->close();
$conexion->close();
?>
