<?php
header('Content-Type: application/json');

// Configuración de conexión a la base de datos
$host = 'localhost';
$dbname = 'canesa';
$username = 'root';
$password = '';

// Conexión a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

// Obtener la tabla de la URL
$table = isset($_GET['table']) ? $_GET['table'] : '';
$allowedTables = ['proveedores', 'trabajadores', 'ventas', 'servicios', 'clientes'];

if (!in_array($table, $allowedTables)) {
    echo json_encode(['error' => 'Tabla no permitida']);
    exit;
}

// Consulta a la base de datos
try {
    $stmt = $pdo->prepare("SELECT fecha, accion, detalles FROM $table");
    $stmt->execute();
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($records);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
}
?>
