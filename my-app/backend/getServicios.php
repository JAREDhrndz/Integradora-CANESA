<?php
header('Content-Type: application/json');
include 'db.php';

$sql = "SELECT id, nombre, descripcion, costo FROM servicios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $servicios = [];
    while ($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
    echo json_encode($servicios);
} else {
    echo json_encode([]);
}

$conn->close();
?>
