<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'canesa'; 
$username = 'root'; 
$password = ''; 

try {
    // Conexión a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener los proveedores
    $sql = "SELECT * FROM proveedores";
    $stmt = $pdo->query($sql);

    // Fetch de los resultados
    $proveedores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Responder con los proveedores en formato JSON
    echo json_encode($proveedores);

} catch (PDOException $e) {
    // En caso de error, devolver un mensaje de error
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
