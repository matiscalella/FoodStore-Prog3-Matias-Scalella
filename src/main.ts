import { checkAuthUser } from "./utils/auth";

// Función que protege las rutas según la página que se intenta visitar
const protectRoutes = () => {
    const currentPath = window.location.pathname;

    // Si el usuario intenta ingresar a una página de admin
    if (currentPath.includes("/pages/admin/")) {
        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "/src/pages/client/home/home.html",
            "admin"
        );
    }

    // Si el usuario intenta ingresar a una página de cliente
    else if (currentPath.includes("/pages/client/")) {
        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "/src/pages/admin/home/home.html",
            "client"
        );
    }
};

// Ejecutar la protección cuando carga la página
protectRoutes();