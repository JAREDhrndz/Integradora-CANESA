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

// Obtener datos del POST
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$cargo = $_POST['cargo'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

// Preparar la declaración SQL para actualizar
$sql = "UPDATE trabajadores SET nombre_trabajador=?, cargo_trabajador=?, telefono_trabajador=?, correo_trabajador=? WHERE id_trabajador=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $nombre, $cargo, $telefono, $correo, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
