<?php
header('Content-Type: application/json');
include 'db.php';

if (isset($_POST['nombre']) && isset($_POST['descripcion']) && isset($_POST['costo'])) {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $costo = $_POST['costo'];

    $sql = "INSERT INTO servicios (nombre, descripcion, costo) VALUES ('$nombre', '$descripcion', '$costo')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}

$conn->close();
?>
