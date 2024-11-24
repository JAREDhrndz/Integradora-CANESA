<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); 
header('Access-Control-Allow-Headers: Content-Type');

$conexion = new mysqli("localhost", "root", "", "canesa");

if ($conexion->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

// Procesar PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $data);
    $descripcion = $data['Descripcion'];
    $fecha = $data['Fecha'];
    $tipo_de_pago = $data['Tipo_de_Pago'];
    $total_pagado = $data['Total_pagado'];
    $num_usuario = $data['Num_usuario'];
    $id_proveedor_servicio = $data['Id_proveedor_servicio'];
    $num_empleado = $data['Num_empleado'];
    $id = $_GET['id']; // Recupera el ID de la URL

    $query = "UPDATE ventas SET Descripcion = ?, Tipo_de_Pago = ?, Total_pagado = ?, Fecha = ?, Num_usuario = ?, Id_proveedor_servicio = ?, Num_empleado = ? WHERE Id = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("ssdsdiii", $descripcion, $tipo_de_pago, $total_pagado, $fecha, $num_usuario, $id_proveedor_servicio, $num_empleado, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Venta actualizada exitosamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al actualizar venta"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}

$conexion->close();
?>
