<?php
// Configuración de la conexión a la base de datos
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'canesa'; 

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Configurar cabeceras para permitir CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Content-Type: application/json');

// Leer datos de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Acción recibida
$action = $data['action'] ?? null;

if ($action === 'insert') {
    // Insertar un nuevo registro
    $descripcion = $data['descripcion'];
    $tipo_de_pago = $data['tipo_de_pago'];
    $total_pagado = $data['total_pagado'];
    $fecha = $data['fecha'];
    $num_usuario = $data['num_usuario'];
    $id_proveedor_servicio = $data['id_proveedor_servicio'];
    $num_empleado = $data['num_empleado'];

    $stmt = $conn->prepare("INSERT INTO ventas (Descripcion, Tipo_de_Pago, Total_pagado, Fecha, Num_usuario, Id_proveedor_servicio, Num_empleado) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdsiis", $descripcion, $tipo_de_pago, $total_pagado, $fecha, $num_usuario, $id_proveedor_servicio, $num_empleado);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Venta agregada con éxito"]);
    } else {
        echo json_encode(["error" => "Error al agregar la venta: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($action === 'delete') {
    // Eliminar un registro
    $descripcion = $data['descripcion'];

    $stmt = $conn->prepare("DELETE FROM ventas WHERE Descripcion = ?");
    $stmt->bind_param("s", $descripcion);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Venta eliminada con éxito"]);
    } else {
        echo json_encode(["error" => "Error al eliminar la venta: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($action === 'update') {
    // Actualizar un registro existente
    $descripcion = $data['descripcion'];
    $tipo_de_pago = $data['tipo_de_pago'];
    $total_pagado = $data['total_pagado'];
    $fecha = $data['fecha'];
    $num_usuario = $data['num_usuario'];
    $id_proveedor_servicio = $data['id_proveedor_servicio'];
    $num_empleado = $data['num_empleado'];

    $stmt = $conn->prepare("UPDATE ventas SET Tipo_de_Pago = ?, Total_pagado = ?, Fecha = ?, Num_usuario = ?, Id_proveedor_servicio = ?, Num_empleado = ? WHERE Descripcion = ?");
    $stmt->bind_param("sdsiiss", $tipo_de_pago, $total_pagado, $fecha, $num_usuario, $id_proveedor_servicio, $num_empleado, $descripcion);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Venta actualizada con éxito"]);
    } else {
        echo json_encode(["error" => "Error al actualizar la venta: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($action === 'select') {
    // Obtener todos los registros
    $result = $conn->query("SELECT * FROM ventas");

    if ($result->num_rows > 0) {
        $ventas = [];
        while ($row = $result->fetch_assoc()) {
            $ventas[] = $row;
        }
        echo json_encode($ventas);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["error" => "Acción no válida"]);
}

$conn->close();
?>
