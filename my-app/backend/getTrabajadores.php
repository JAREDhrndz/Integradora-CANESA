<?php
header("Access-Control-Allow-Origin: *"); // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos

$host = 'localhost';
$user = 'root'; // Cambia a tu nombre de usuario
$password = ''; // Cambia a tu contraseña
$dbname = 'canesa'; // Cambia al nombre de tu base de datos


// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    error_log("Conexión fallida: " . $conn->connect_error); // Registra el error
    die("Error en la conexión a la base de datos. Por favor, inténtalo más tarde.");
}

// Configuración del conjunto de caracteres
$conn->set_charset("utf8mb4");

// Consulta para obtener los trabajadores (ajustada a los nombres de los campos correctos)
$sql = "SELECT Numero_empleado, Nombre, Cargo, Telefono, Correo_Electronico FROM trabajadores";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Almacenar los datos en un array
    $trabajadores = [];
    while ($row = $result->fetch_assoc()) {
        $trabajadores[] = $row;
    }
    // Devolver los datos en formato JSON
    echo json_encode($trabajadores);
} else {
    echo json_encode([]); // Devolver un array vacío si no hay resultados
}

// Cerrar la conexión
$conn->close();
?>
