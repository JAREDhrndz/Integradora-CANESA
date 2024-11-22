<?php
include 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM ventas");
    $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($ventas);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
