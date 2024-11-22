<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
include 'db.php'; // Incluye el archivo db.php que configura la conexión

if (!$data) {
    echo json_encode(['error' => 'No se proporcionaron datos válidos']);
    exit;
}

try {
    // Usa la conexión $pdo de db.php
    $stmt = $pdo->prepare("INSERT INTO usuarios (Nombre, Correo, Telefono, Direccion, Fecha_nacimiento, Tipo_usuario) VALUES (:Nombre, :Correo, :Telefono, :Direccion, :Fecha_nacimiento, :Tipo_usuario)");
    $stmt->execute([
        ':Nombre' => $data['Nombre'] ?? null,
        ':Correo' => $data['Correo'] ?? null,
        ':Telefono' => $data['Telefono'] ?? null,
        ':Direccion' => $data['Direccion'] ?? null,
        ':Fecha_nacimiento' => $data['Fecha_nacimiento'] ?? null,
        ':Tipo_usuario' => $data['Tipo_usuario'] ?? null,
    ]);

    $data['Id'] = $pdo->lastInsertId(); // Obtén el ID generado
    echo json_encode(['message' => 'Usuario agregado exitosamente', 'data' => $data]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
