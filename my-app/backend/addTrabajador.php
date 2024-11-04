<?php
include('db.php'); // Asegúrate de que este archivo se incluya correctamente

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Comprobar si se recibe una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del cuerpo de la solicitud
    $nombre = $_POST['nombre'] ?? null;
    $cargo = $_POST['cargo'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $correo = $_POST['correo'] ?? null;

    // Verificar que no haya campos vacíos
    if (empty($nombre) || empty($cargo) || empty($telefono) || empty($correo)) {
        echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios."]);
        exit;
    }

    // Preparar la consulta SQL para insertar un nuevo trabajador
    $stmt = $conn->prepare("INSERT INTO trabajadores (nombre_trabajador, cargo_trabajador, telefono_trabajador, correo_trabajador) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nombre, $cargo, $telefono, $correo);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Trabajador agregado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al agregar trabajador: " . $stmt->error]);
    }

    // Cerrar la declaración
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}

// Cerrar la conexión
$conn->close();
?>
