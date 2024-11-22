<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'localhost';
$db = 'canesa';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT Numero_empleado, Nombre, Cargo, Telefono, Correo_Electronico FROM trabajadores");
    $trabajadores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($trabajadores);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
