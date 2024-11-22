<?php
header('Content-Type: application/json');
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
include 'db.php';


$id = $_GET['id'];

$host = 'localhost';
$db = 'tu_base_de_datos';
$user = 'tu_usuario';
$password = 'tu_contraseña';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("UPDATE usuarios 
                           SET Nombre = :Nombre, Correo = :Correo, Telefono = :Telefono, Direccion = :Direccion, 
                               Fecha_nacimiento = :Fecha_nacimiento, Tipo_usuario = :Tipo_usuario
                           WHERE Id = :Id");
    $stmt->execute([
        ':Id' => $id,
        ':Nombre' => $data['Nombre'],
        ':Correo' => $data['Correo'],
        ':Telefono' => $data['Telefono'],
        ':Direccion' => $data['Direccion'],
        ':Fecha_nacimiento' => $data['Fecha_nacimiento'],
        ':Tipo_usuario' => $data['Tipo_usuario'],
    ]);

    echo json_encode(['message' => 'Usuario actualizado exitosamente']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
