<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'canesa';
$user = 'root';
$password = '';

$numero_empleado = $_POST['numero_empleado'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("DELETE FROM trabajadores WHERE Numero_empleado = ?");
    $stmt->execute([$numero_empleado]);

    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
