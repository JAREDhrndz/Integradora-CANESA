<?php
header('Content-Type: application/json');
include 'db.php'; // Archivo para la conexión a la base de datos

// Leer datos JSON enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);

// Validar que los datos requeridos están presentes
if (!isset($data['correo']) || !isset($data['contraseña'])) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Datos incompletos']);
    exit();
}

$correo = $data['correo'];
$contraseña = $data['contraseña'];

// Verificar usuario en la base de datos
$sql = "SELECT contraseña FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($hash);
    $stmt->fetch();

    // Verificar contraseña
    if (password_verify($contraseña, $hash)) {
        echo json_encode(['status' => 'success', 'mensaje' => 'Inicio de sesión exitoso']);
    } else {
        echo json_encode(['status' => 'error', 'mensaje' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['status' => 'error', 'mensaje' => 'Correo no registrado']);
}

$stmt->close();
$conn->close();
?>
