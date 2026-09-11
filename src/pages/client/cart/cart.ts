import type { ICartItem } from "../../../types/product";
import {
    actualizarCantidad,
    calcularTotalCarrito,
    obtenerCarrito,
} from "../../../utils/cart";
import { logout } from "../../../utils/auth";

const buttonLogout =
    document.querySelector<HTMLButtonElement>("#logoutButton");

const contenedorCarrito =
    document.querySelector<HTMLElement>("#contenedor-carrito");

const mensajeCarritoVacio =
    document.querySelector<HTMLParagraphElement>(
        "#mensaje-carrito-vacio"
    );

const totalCarrito =
    document.querySelector<HTMLSpanElement>("#total-carrito");

if (
    !buttonLogout ||
    !contenedorCarrito ||
    !mensajeCarritoVacio ||
    !totalCarrito
) {
    throw new Error("No se encontraron los elementos del carrito.");
}

buttonLogout.addEventListener("click", () => {
    logout();
});

const crearItemCarrito = (
    item: ICartItem
): HTMLElement => {
    const article = document.createElement("article");

    article.className = "item-carrito";

    const subtotal =
        item.producto.precio * item.cantidad;

    article.innerHTML = `
    <img
      class="imagen-item-carrito"
      src="${item.producto.imagen}"
      alt="${item.producto.nombre}"
    >

    <div class="informacion-item-carrito">
      <h3>${item.producto.nombre}</h3>

      <p>
        Precio unitario:
        <strong>
          $ ${item.producto.precio.toLocaleString("es-AR")}
        </strong>
      </p>
    </div>

    <div class="controles-cantidad">
      <p>Cantidad:</p>

      <button
        type="button"
        class="boton-cantidad"
        data-action="decrementar"
        data-product-id="${item.producto.id}"
        aria-label="Restar una unidad de ${item.producto.nombre}"
      >
        −
      </button>

      <strong>${item.cantidad}</strong>

      <button
        type="button"
        class="boton-cantidad"
        data-action="incrementar"
        data-product-id="${item.producto.id}"
        aria-label="Agregar una unidad de ${item.producto.nombre}"
        ${item.cantidad >= item.producto.stock ? "disabled" : ""}
      >
        +
      </button>
    </div>

    <p class="subtotal-item-carrito">
      Subtotal:
      <strong>
        $ ${subtotal.toLocaleString("es-AR")}
      </strong>
    </p>
  `;

    return article;
};

const renderizarCarrito = (): void => {
    const carrito = obtenerCarrito();

    contenedorCarrito.innerHTML = "";
    mensajeCarritoVacio.textContent = "";

    if (carrito.length === 0) {
        mensajeCarritoVacio.textContent =
            "El carrito está vacío.";

        totalCarrito.textContent = "$ 0";
        return;
    }

    carrito.forEach((item) => {
        const elementoCarrito = crearItemCarrito(item);
        contenedorCarrito.appendChild(elementoCarrito);
    });

    const total = calcularTotalCarrito();

    totalCarrito.textContent =
        `$ ${total.toLocaleString("es-AR")}`;
};
contenedorCarrito.addEventListener(
    "click",
    (event: MouseEvent) => {
        const elementoSeleccionado = event.target;

        if (!(elementoSeleccionado instanceof HTMLButtonElement)) {
            return;
        }

        if (!elementoSeleccionado.classList.contains("boton-cantidad")) {
            return;
        }

        const productoId =
            Number(elementoSeleccionado.dataset.productId);

        const accion =
            elementoSeleccionado.dataset.action;

        const carrito = obtenerCarrito();

        const itemEncontrado = carrito.find(
            (item) => item.producto.id === productoId
        );

        if (!itemEncontrado) {
            return;
        }

        if (accion === "incrementar") {
            actualizarCantidad(
                productoId,
                itemEncontrado.cantidad + 1
            );
        }

        if (accion === "decrementar") {
            actualizarCantidad(
                productoId,
                itemEncontrado.cantidad - 1
            );
        }

        renderizarCarrito();
    }
);
renderizarCarrito();