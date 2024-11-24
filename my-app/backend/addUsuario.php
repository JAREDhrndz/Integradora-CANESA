<?php
header('Content-Type: application/json');

// Establecemos la conexión con la base de datos
$conexion = new mysqli("localhost", "root", "", "canesa");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

// Verificamos si todos los parámetros están presentes
if (isset($_POST['Nombre'], $_POST['Correo_Electronico'], $_POST['Telefono'], $_POST['Direccion'], $_POST['Tipo_usuario'], $_POST['Contraseña'])) {
    // Recibimos los datos a través del método POST
    $nombre = $_POST['Nombre'];
    $correo_electronico = $_POST['Correo_Electronico'];
    $telefono = $_POST['Telefono'];
    $direccion = $_POST['Direccion'];
    // Si el tipo de usuario está vacío, establecemos 'Cliente' como valor predeterminado
    $tipo_usuario = !empty($_POST['Tipo_usuario']) ? $_POST['Tipo_usuario'] : 'Cliente';
    $contraseña = $_POST['Contraseña'];

    // Preparamos la consulta SQL
    $query = "INSERT INTO usuarios (Nombre, Correo_Electronico, Telefono, Direccion, Tipo_usuario, Contraseña) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($query);

    // Vinculamos los parámetros de la consulta
    $stmt->bind_param("ssssss", $nombre, $correo_electronico, $telefono, $direccion, $tipo_usuario, $contraseña);

    // Ejecutamos la consulta
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Usuario agregado exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al agregar usuario"]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Faltan parámetros en la solicitud"]);
}

$conexion->close();
?>
