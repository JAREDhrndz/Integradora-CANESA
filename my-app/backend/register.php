<?php
header('Content-Type: application/json');
include 'db.php'; // Archivo para la conexión a la base de datos

// Leer datos JSON enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);

// Validar que los datos requeridos están presentes
if (!isset($data['nombre']) || !isset($data['correo']) || !isset($data['contraseña']) || !isset($data['telefono'])) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Datos incompletos']);
    exit();
}

$nombre = $data['nombre'];
$correo = $data['correo'];
$contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT); // Encriptar contraseña
$telefono = $data['telefono'];

// Verificar si el correo ya está registrado
$sql = "SELECT id FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'mensaje' => 'El correo ya está registrado']);
    $stmt->close();
    $conn->close();
    exit();
}

// Insertar nuevo usuario
$stmt->close();
$sql = "INSERT INTO usuarios (nombre, correo, contraseña, telefono) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nombre, $correo, $contraseña, $telefono);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'mensaje' => 'Registro exitoso']);
} else {
    echo json_encode(['status' => 'error', 'mensaje' => 'Error al registrar']);
}

$stmt->close();
$conn->close();
?>
