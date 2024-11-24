<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'canesa';
$user = 'root';
$password = '';

$id_proveedor = $_POST['id']; // Asegúrate de que el parámetro se llame 'id' en la solicitud POST

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Asegúrate de que la tabla y el campo sean correctos (aquí uso N_proveedor)
    $stmt = $pdo->prepare("DELETE FROM proveedores WHERE N_proveedor = ?");
    $stmt->execute([$id_proveedor]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>

