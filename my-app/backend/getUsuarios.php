<?php
header('Content-Type: application/json');

// Incluye db.php, que devuelve un objeto PDO
$pdo = include 'db.php';

if (!$pdo) {
    echo json_encode(['error' => 'No se pudo establecer la conexión a la base de datos.']);
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM usuarios");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($usuarios);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
