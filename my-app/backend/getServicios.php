<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "canesa";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

$sql = "SELECT * FROM servicios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $servicios = array();
    while($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
    echo json_encode($servicios);
} else {
    echo "0 resultados";
}

$conn->close();
?>
