import type { IUser } from "../../../types/IUser";
// Se importa la funcion navigate para poder redirigir al usuario
import { navigate } from "../../../utils/navigate";

import { createDefaultAdmin } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;


createDefaultAdmin();
form.addEventListener("submit", (e: SubmitEvent) => {

  // Evitar que el formulario recargue la pagina
  e.preventDefault();

  // Guardo los valores ingresados por el usuario en variables
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  // Se intenta recuperar del localStorage el array de usuarios registrados actuales
  const usersStorage = localStorage.getItem("users");

  // Si no existe la clave "users", significa que todavía no hay usuarios registrados
  if (!usersStorage) {
    alert("No hay usuarios registrados.");
    return;
  }

  // Se convierte nuevamente el texto en un array de objetos IUser
  const users: IUser[] = JSON.parse(usersStorage);

  // Buscar dentro del array si hay un usuario que coincida con los ingresados en el formulario
  const userFound = users.find(
    (user) =>
      user.email === valueEmail &&
      user.password === valuePassword
  );

  // Si find() no encuentra ningun usuario mostrar un alert
  if (!userFound) {
    alert("Email o contraseña incorrectos.");
    return;
  }

  // Si encontramos al usuario, marcar su sesión como iniciada
  userFound.loggedIn = true;

  // Se guarda el usuario encontrado en localStorage bajo la clave "userData"
  // Esto representa al usuario que actualmente tiene la sesión iniciada
  localStorage.setItem(
    "userData",
    JSON.stringify(userFound)
  );

  // Si el usuario es administrador, enviarlo al home de admin
  if (userFound.role === "admin") {
    navigate("/src/pages/admin/home/home.html");

  // Si no es admin, enviar al home de client (por defecto)
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});