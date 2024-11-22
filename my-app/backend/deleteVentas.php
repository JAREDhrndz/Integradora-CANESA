<?php
include 'db.php';

$id = $_GET['id'];

if ($id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM ventas WHERE Id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Venta eliminada correctamente.']);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
