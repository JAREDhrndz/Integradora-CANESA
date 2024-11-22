<?php
header('Content-Type: application/json');
include 'db.php';

if (isset($_POST['id']) && isset($_POST['nombre']) && isset($_POST['descripcion']) && isset($_POST['costo'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $costo = $_POST['costo'];

    $sql = "UPDATE servicios SET nombre = '$nombre', descripcion = '$descripcion', costo = '$costo' WHERE id = '$id'";

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
