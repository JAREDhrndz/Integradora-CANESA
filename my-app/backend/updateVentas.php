<?php
include 'db.php';

$id = $_GET['id'];
$data = json_decode(file_get_contents("php://input"), true);

if ($data && $id) {
    $descripcion = $data['Descripcion'];
    $tipo_pago = $data['Tipo_de_Pago'];
    $total_pagado = $data['Total_pagado'];
    $fecha = $data['Fecha'];
    $num_usuario = $data['Num_usuario'];
    $id_proveedor = $data['Id_proveedor_servicio'];
    $num_empleado = $data['Num_empleado'];

    try {
        $stmt = $pdo->prepare("UPDATE ventas SET Descripcion = ?, Tipo_de_Pago = ?, Total_pagado = ?, Fecha = ?, Num_usuario = ?, Id_proveedor_servicio = ?, Num_empleado = ? WHERE Id = ?");
        $stmt->execute([$descripcion, $tipo_pago, $total_pagado, $fecha, $num_usuario, $id_proveedor, $num_empleado, $id]);
        echo json_encode(['message' => 'Venta actualizada correctamente.']);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
