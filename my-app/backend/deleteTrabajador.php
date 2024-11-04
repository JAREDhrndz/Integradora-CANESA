<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "canesa";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener ID del trabajador a eliminar
$id = $_POST['id'];

// Preparar la declaración SQL para eliminar
$sql = "DELETE FROM trabajadores WHERE id_trabajador=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
