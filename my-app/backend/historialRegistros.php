<?php
header('Content-Type: application/json');

// Configuración de la conexión a la base de datos
$host = 'localhost';
$dbname = 'canesa';
$username = 'root';
$password = '';

// Conectar a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

// Consultas para obtener registros de cada tabla
$queries = [
    'citas_copia' => 'SELECT * FROM citas_copia',
    'proveedores_copia' => 'SELECT * FROM proveedores_copia',
    'proveedor_servicio_copia' => 'SELECT * FROM proveedor_servicio_copia',
    'registro_cita' => 'SELECT * FROM registro_cita',
    'registro_cita_copia' => 'SELECT * FROM registro_cita_copia',
    'servicios_copia' => 'SELECT * FROM servicios_copia',
    'trabajadores_copia' => 'SELECT * FROM trabajadores_copia',
    'usuarios_copia' => 'SELECT * FROM usuarios_copia',
    'ventas_copia' => 'SELECT * FROM ventas_copia'
];

$registros = [];

foreach ($queries as $tabla => $query) {
    try {
        $stmt = $pdo->query($query);
        $tablaRegistros = [];
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $tablaRegistros[] = [
                'registro' => $row,
                'tipo_modificacion' => $row['tipo_modificacion'] ?? 'N/A',
                'fecha_modificacion' => $row['fecha_modificacion'] ?? 'N/A'
            ];
        }
        
        if (count($tablaRegistros) > 0) {
            $registros[$tabla] = $tablaRegistros;
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al consultar la tabla ' . $tabla . ': ' . $e->getMessage()]);
        exit;
    }
}

// Devolver los registros como JSON
echo json_encode($registros);
?>
