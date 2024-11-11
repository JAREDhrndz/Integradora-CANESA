<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir solo el origen específico
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Responder a la solicitud OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include('db.php'); // Asegúrate de que este archivo se incluya correctamente

// Comprobar si se recibe una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el correo y la contraseña desde la solicitud
    $correo = $_POST['correo'] ?? null;
    $contraseña = $_POST['contraseña'] ?? null;

    // Verificar que no haya campos vacíos
    if (empty($correo) || empty($contraseña)) {
        echo json_encode(["status" => "error", "mensaje" => "El correo y la contraseña son obligatorios."]);
        exit;
    }

    // Consultar si el correo y la contraseña coinciden en la tabla trabajadores
    $stmt = $conn->prepare("SELECT COUNT(*) FROM trabajadores WHERE correo_trabajador = ? AND contraseña = ?");
    $stmt->bind_param("ss", $correo, $contraseña);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();

    if ($count > 0) {
        echo json_encode(["status" => "success", "mensaje" => "Login exitoso."]);
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Correo o contraseña incorrectos."]);
    }

    // Cerrar la declaración y la conexión
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "mensaje" => "Método no permitido."]);
}
?>
