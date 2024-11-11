// Crear el contenido del menú principal
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("center-content");

    // Contenedor del logo
    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";

    const logo = document.createElement("img");
    logo.src = "assets/Logo.png";
    logo.alt = "Logo Constructora Canese";
    logo.className = "logo";
    logoContainer.appendChild(logo);

    // Título del menú
    const title = document.createElement("h2");
    title.id = "menu-title"; // Agregar ID

    title.textContent = "Menú Principal";

    const subtitle = document.createElement("h3");
    subtitle.id = "menu-subtitle"; // Agregar ID
    subtitle.textContent = "Apartados";

    // Contenedor del menú
    const menuContainer = document.createElement("div");
    menuContainer.id = "menu-container"; // Agregar ID
    menuContainer.className = "menu-container animate__animated animate__fadeIn";

    // Crear los elementos de los apartados del menú
    const menuItems = [
        { href: "gestion_citas.html", text: "Gestión Citas" },
        { href: "gestion_proveedores.html", text: "Gestión Proveedores" },
        { href: "gestion_trabajadores.html", text: "Gestión Trabajadores" },
        { href: "servicios.html", text: "Servicios" },
        { href: "ventas.html", text: "Ventas" },
        { href: "/gestion-trabajadores", text: "Gestión de Trabajadores" }, // Enlace de prueba
        { href: "/gestion-ventas", text: "Gestión de Ventas" }, // Enlace de prueba
        { href: "/otra-seccion", text: "Otra Sección" }, // Enlace de prueba
        { href: "/formulario-ejemplo", text: "Formulario Ejemplo" }, // Enlace de prueba
        { href: "/tabla-ejemplo", text: "Tabla Ejemplo" } // Enlace de prueba
    ];

    menuItems.forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.className = "menu-item";
        link.textContent = item.text;
        menuContainer.appendChild(link);
    });

    // Botón de regresar
    const backButtonContainer = document.createElement("div");
    backButtonContainer.id = "back-button-container"; // Agregar ID
    backButtonContainer.className = "back-button-container";

    const backButton = document.createElement("button");
    backButton.id = "back-button"; // Agregar ID
    backButton.className = "btn-back";
    backButton.textContent = "Regresar al Menú";
    backButton.onclick = () => window.location.href = 'index.html';
    backButtonContainer.appendChild(backButton);

    // Agregar todos los elementos al cuerpo del documento
    document.body.appendChild(logoContainer);
    document.body.appendChild(title);
    document.body.appendChild(subtitle);
    document.body.appendChild(menuContainer);
    document.body.appendChild(backButtonContainer);
});
