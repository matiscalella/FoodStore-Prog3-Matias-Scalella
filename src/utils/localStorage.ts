import type { IUser } from "../types/IUser";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};
// Funcion para crear un usuario administrador por default
export const createDefaultAdmin = () => {
  const usersStorage = localStorage.getItem("users");

  let users: IUser[] = [];

  if (usersStorage) {
    users = JSON.parse(usersStorage);
  }

  const adminExists = users.some(
    (user) => user.email === "admin@gmail.com"
  );

  if (!adminExists) {
    const admin: IUser = {
      email: "admin@gmail.com",
      password: "admin123",
      loggedIn: false,
      role: "admin",
    };

    users.push(admin);

    localStorage.setItem("users", JSON.stringify(users));
  }
};
