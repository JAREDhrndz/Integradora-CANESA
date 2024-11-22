<?php
header('Content-Type: application/json');
include 'db.php'; // Incluye el archivo db.php que configura la conexión

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'Falta el parámetro ID']);
    exit;
}

try {
    // Reutiliza la conexión $pdo de db.php
    $pdo = include 'db.php';

    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE Id = :Id");
    $stmt->execute([':Id' => $id]);

    echo json_encode(['message' => 'Usuario eliminado exitosamente']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
