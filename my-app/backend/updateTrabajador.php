<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'canesa';
$user = 'root';
$password = '';

$nombre = $_POST['nombre'];
$cargo = $_POST['cargo'];
$telefono = $_POST['telefono'];
$correo_electronico = $_POST['correo_electronico'];
$numero_empleado = $_POST['id']; // id enviado desde el frontend

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("UPDATE trabajadores SET Nombre = ?, Cargo = ?, Telefono = ?, Correo_Electronico = ? WHERE Numero_empleado = ?");
    $stmt->execute([$nombre, $cargo, $telefono, $correo_electronico, $numero_empleado]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
