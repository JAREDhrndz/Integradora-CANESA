<?php
header('Content-Type: application/json');

try {
    include 'db.php';
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar que los datos mínimos estén presentes
    if (!isset($_POST['nombre']) || !isset($_POST['cargo']) || !isset($_POST['telefono']) || !isset($_POST['correo_electronico'])) {
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
        exit;
    }

    // Obtener los datos del formulario
    $numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : null;
    $nombre = $_POST['nombre'];
    $cargo = $_POST['cargo'];
    $telefono = $_POST['telefono'];
    $correo_electronico = $_POST['correo_electronico'];
    
    if ($numero_empleado) {
        // Actualizar trabajador existente
        $stmt = $pdo->prepare("
            UPDATE trabajadores 
            SET Nombre = :nombre, Cargo = :cargo, Telefono = :telefono, Correo_Electronico = :correo_electronico
            WHERE Numero_empleado = :numero_empleado
        ");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':cargo', $cargo);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':correo_electronico', $correo_electronico);
        $stmt->bindParam(':numero_empleado', $numero_empleado);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Trabajador actualizado exitosamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se pudo actualizar el trabajador']);
        }
    } else {
        // Insertar nuevo trabajador
        $stmt = $pdo->prepare("
            INSERT INTO trabajadores (Nombre, Cargo, Telefono, Correo_Electronico) 
            VALUES (:nombre, :cargo, :telefono, :correo_electronico)
        ");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':cargo', $cargo);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':correo_electronico', $correo_electronico);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Trabajador agregado exitosamente']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se pudo agregar el trabajador']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
