<?php
// Configurar la conexión a la base de datos
$host = 'localhost';
$dbname = 'canesa';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener las ventas
    $sql = "SELECT 
                Id, Descripcion, Tipo_de_Pago, Total_pagado, Fecha, 
                Num_usuario, Id_proveedor_servicio, Num_empleado 
            FROM ventas";
    
    $stmt = $pdo->query($sql);
    $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retornar los resultados como JSON
    echo json_encode($ventas);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la conexión a la base de datos: ' . $e->getMessage()]);
}
?>
