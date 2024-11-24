<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$host = 'localhost';
$db = 'canesa';
$user = 'root';
$password = '';

$data = json_decode(file_get_contents("php://input"), true); // Obtener los datos JSON

if (isset($data['id']) && isset($data['nombre']) && isset($data['descripcion']) && isset($data['costo'])) {
    $id = $data['id'];
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];
    $costo = $data['costo'];

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("UPDATE servicios SET Nombre = ?, Descripcion = ?, Costo = ? WHERE Id = ?");
        $stmt->execute([$nombre, $descripcion, $costo, $id]);

        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
}
?>
