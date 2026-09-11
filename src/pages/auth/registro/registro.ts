import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;

const inputEmail = document.getElementById("email") as HTMLInputElement;

const inputPassword = document.getElementById(
    "password"
) as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    // Obtener los valores de los inputs
    const valueEmail = inputEmail.value;
    const valuePassword = inputPassword.value;
    const usersStorage = localStorage.getItem("users");

    let users: IUser[] = [];

    if (usersStorage) {
        users = JSON.parse(usersStorage);
    }

    const userExists = users.some(
        (user) => user.email === valueEmail
    );
    // Mensaje en caso de que exista el usuario
    if (userExists) {
        alert("Ya existe un usuario registrado con ese email.");
        return;
    }

    const user: IUser = {
        email: valueEmail,
        password: valuePassword,
        loggedIn: false,
        role: "client",
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado correctamente.");
    form.reset();
    navigate("../login/login.html");
});