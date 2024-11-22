<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $descripcion = $data['Descripcion'];
    $tipo_pago = $data['Tipo_de_Pago'];
    $total_pagado = $data['Total_pagado'];
    $fecha = $data['Fecha'];
    $num_usuario = $data['Num_usuario'];
    $id_proveedor = $data['Id_proveedor_servicio'];
    $num_empleado = $data['Num_empleado'];

    try {
        $stmt = $pdo->prepare("INSERT INTO ventas (Descripcion, Tipo_de_Pago, Total_pagado, Fecha, Num_usuario, Id_proveedor_servicio, Num_empleado) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$descripcion, $tipo_pago, $total_pagado, $fecha, $num_usuario, $id_proveedor, $num_empleado]);

        $newVenta = [
            'Id' => $pdo->lastInsertId(),
            'Descripcion' => $descripcion,
            'Tipo_de_Pago' => $tipo_pago,
            'Total_pagado' => $total_pagado,
            'Fecha' => $fecha,
            'Num_usuario' => $num_usuario,
            'Id_proveedor_servicio' => $id_proveedor,
            'Num_empleado' => $num_empleado,
        ];

        echo json_encode($newVenta);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
