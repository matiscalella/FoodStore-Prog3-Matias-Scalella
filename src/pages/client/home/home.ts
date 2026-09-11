// import que trae los datos
import { PRODUCTS, getCategories } from "../../../data/data";
// import para traer los tipos
import type { IProduct } from "../../../types/product";
import type { ICategoria } from "../../../types/categoria";
import { logout } from "../../../utils/auth";
import {
  agregarAlCarrito,
  obtenerCarrito,
} from "../../../utils/cart";

const buttonLogout =
  document.querySelector<HTMLButtonElement>("#logoutButton");

const listaCategorias =
  document.querySelector<HTMLUListElement>("#lista-categorias");

const contenedorProductos =
  document.querySelector<HTMLElement>("#contenedor-productos");

const formBusqueda =
  document.querySelector<HTMLFormElement>("#form-busqueda");

const inputBusqueda =
  document.querySelector<HTMLInputElement>("#input-busqueda");

const mensajeProductos =
  document.querySelector<HTMLParagraphElement>("#mensaje-productos");

const cantidadCarrito =
  document.querySelector<HTMLSpanElement>("#cantidad-carrito");

const mensajeCarrito =
  document.querySelector<HTMLParagraphElement>("#mensaje-carrito");

if (
  !buttonLogout ||
  !listaCategorias ||
  !contenedorProductos ||
  !formBusqueda ||
  !inputBusqueda ||
  !mensajeProductos ||
  !cantidadCarrito ||
  !mensajeCarrito
) {
  throw new Error("No se encontraron los elementos necesarios del DOM.");
}

const productosVisibles = PRODUCTS.filter(
  (producto) => !producto.eliminado
);

buttonLogout.addEventListener("click", () => {
  logout();
});


// Eventos del formulario de búsqueda
inputBusqueda.addEventListener("input", () => {
  buscarProductos();
});

formBusqueda.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  buscarProductos();
});

// Crear la tarjeta del Producto
const crearTarjetaProducto = (producto: IProduct): HTMLElement => {
  const article = document.createElement("article");
  const estaDisponible =
    producto.disponible && producto.stock > 0;

  article.className = "producto";

  article.innerHTML = `
    <img
      src="${producto.imagen}"
      alt="${producto.nombre}"
    >

    <h3>${producto.nombre}</h3>

    <p>${producto.descripcion}</p>

    <div class="producto-detalles">
      <p>
        Precio:
        <strong>$ ${producto.precio.toLocaleString("es-AR")}</strong>
      </p>

      <p>Stock: ${producto.stock}</p>

      <button
        type="button"
        class="boton-agregar"
        data-product-id="${producto.id}"
        ${estaDisponible ? "" : "disabled"}
      >
        ${estaDisponible ? "Agregar al carrito" : "No disponible"}
      </button>
    </div>
  `;

  return article;
};

const renderizarProductos = (productos: IProduct[]): void => {
  contenedorProductos.innerHTML = "";
  mensajeProductos.textContent = "";

  if (productos.length === 0) {
    mensajeProductos.textContent =
      "No se encontraron productos que coincidan con la búsqueda.";

    return;
  }

  productos.forEach((producto) => {
    const tarjeta = crearTarjetaProducto(producto);
    contenedorProductos.appendChild(tarjeta);
  });
};

const crearElementoCategoria = (
  categoria: ICategoria
): HTMLLIElement => {
  const li = document.createElement("li");

  li.innerHTML = `
    <button
      type="button"
      class="boton-categoria"
      data-category-id="${categoria.id}"
    >
      ${categoria.nombre}
    </button>
  `;

  return li;
};

const renderizarCategorias = (categorias: ICategoria[]): void => {
  listaCategorias.innerHTML = "";

  const liTodos = document.createElement("li");

  liTodos.innerHTML = `
    <button
      type="button"
      class="boton-categoria"
      data-category-id="todos"
    >
      Todos
    </button>
  `;

  listaCategorias.appendChild(liTodos);

  categorias.forEach((categoria) => {
    const elementoCategoria = crearElementoCategoria(categoria);
    listaCategorias.appendChild(elementoCategoria);
  });
};

// Funcion para buscar los Productos
const buscarProductos = (): void => {
  const textoBuscado = inputBusqueda.value
    .trim() // elimina espacios
    .toLowerCase(); // convierte el texto a minúsculas

  const productosEncontrados = productosVisibles.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(textoBuscado) // includes permite busquedas parciales
  );
  marcarCategoriaTodos();
  renderizarProductos(productosEncontrados);
};

// Filtrar los productos por Categoria
const filtrarProductosPorCategoria = (
  idCategoria: string
): void => {
  inputBusqueda.value = "";

  if (idCategoria === "todos") {
    renderizarProductos(productosVisibles);
    return;
  }

  const idCategoriaNumerico = Number(idCategoria);

  const productosFiltrados = productosVisibles.filter(
    (producto) =>
      producto.categorias.some( // some comprueba si alguna categoria del producto tiene ese id
        (categoria) => categoria.id === idCategoriaNumerico
      )
  );

  renderizarProductos(productosFiltrados);
};

const marcarCategoriaActiva = (
  botonSeleccionado: HTMLButtonElement
): void => {
  const botonesCategorias =
    listaCategorias.querySelectorAll<HTMLButtonElement>(
      ".boton-categoria"
    );
  // eliminar la clase activa de todos
  botonesCategorias.forEach((boton) => {
    boton.classList.remove("activa");
  });
  // Agrega la clase activa únicamente al botón seleccionado
  botonSeleccionado.classList.add("activa");
};

const marcarCategoriaTodos = (): void => {
  const botonTodos =
    listaCategorias.querySelector<HTMLButtonElement>(
      '[data-category-id="todos"]'
    );

  if (botonTodos) {
    marcarCategoriaActiva(botonTodos);
  }
};

listaCategorias.addEventListener(
  "click",
  (event: MouseEvent) => {
    const elementoSeleccionado = event.target;

    if (!(elementoSeleccionado instanceof HTMLButtonElement)) {
      return;
    }

    const idCategoria =
      elementoSeleccionado.dataset.categoryId;

    if (!idCategoria) {
      return;
    }

    filtrarProductosPorCategoria(idCategoria);
    marcarCategoriaActiva(elementoSeleccionado);
  }
);

const actualizarIndicadorCarrito = (): void => {
  const carrito = obtenerCarrito();

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  cantidadCarrito.textContent = cantidadTotal.toString();
};

const mostrarConfirmacion = (
  nombreProducto: string
): void => {
  mensajeCarrito.textContent =
    `${nombreProducto} fue agregado al carrito.`;
};

contenedorProductos.addEventListener(
  "click",
  (event: MouseEvent) => {
    const elementoSeleccionado = event.target;

    if (!(elementoSeleccionado instanceof HTMLButtonElement)) {
      return;
    }

    if (!elementoSeleccionado.classList.contains("boton-agregar")) {
      return;
    }

    const productoId =
      Number(elementoSeleccionado.dataset.productId);

    const productoEncontrado = PRODUCTS.find(
      (producto) => producto.id === productoId
    );

    if (!productoEncontrado) {
      return;
    }

    const productoAgregado =
      agregarAlCarrito(productoEncontrado);

    if (!productoAgregado) {
      mensajeCarrito.textContent =
        `No hay más stock disponible de ${productoEncontrado.nombre}.`;

      mensajeCarrito.classList.add("error");
      return;
    }

    mensajeCarrito.classList.remove("error");
    actualizarIndicadorCarrito();
    mostrarConfirmacion(productoEncontrado.nombre);
  }
);

const iniciarPagina = (): void => {
  const categoriasVisibles = getCategories();

  renderizarCategorias(categoriasVisibles);
  renderizarProductos(productosVisibles);

  marcarCategoriaTodos();
  actualizarIndicadorCarrito();
};

iniciarPagina();