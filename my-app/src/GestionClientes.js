const fetchClientes = async () => {
    try {
        const response = await fetch('http://localhost/my-app/backend/getClientes.php'); // URL ajustada al formato adecuado
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClientes(data);
    } catch (error) {
        console.error('Error fetching clientes:', error);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const { num_usuario, tipo_usuario, nombre, telefono, direccion, correo_electronico } = formData;

    try {
        let response;
        if (num_usuario) {
            // Actualizar cliente
            response = await fetch('http://localhost/my-app/backend/updateCliente.php', {  // Actualiza con el archivo PHP correspondiente
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ num_usuario, tipo_usuario, nombre, telefono, direccion, correo_electronico }),
            });
        } else {
            // Añadir nuevo cliente
            response = await fetch('http://localhost/my-app/backend/addCliente.php', {  // Actualiza con el archivo PHP correspondiente
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ tipo_usuario, nombre, telefono, direccion, correo_electronico }),
            });
        }

        const result = await response.json();
        if (result.status === "success") {
            fetchClientes();
        } else {
            console.error('Error:', result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    setFormData({ num_usuario: '', tipo_usuario: 'Cliente', nombre: '', telefono: '', direccion: '', correo_electronico: '' });
};

const handleDelete = async (num_usuario) => {
    try {
        const response = await fetch('http://localhost/my-app/backend/deleteCliente.php', {  // Actualiza con el archivo PHP correspondiente
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ num_usuario }),
        });

        const result = await response.json();
        if (result.status === "success") {
            fetchClientes();
        } else {
            console.error('Error deleting cliente:', result.message);
        }
    } catch (error) {
        console.error('Error deleting cliente:', error);
    }
};
