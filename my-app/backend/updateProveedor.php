<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "canesa";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados por POST
    $nombre = $_POST['nombre'];

    // Consultar y eliminar el registro
    $sql = "DELETE FROM trabajadores WHERE nombre = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nombre);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Trabajador eliminado"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al eliminar el trabajador"]);
    }

    $stmt->close();
}

$conn->close();
?>
