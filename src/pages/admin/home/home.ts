import { logout } from "../../../utils/auth";

// Seleccionamos el botón de cerrar sesión
const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;

// Al hacer click, cerramos la sesión
buttonLogout?.addEventListener("click", () => {
  logout();
});