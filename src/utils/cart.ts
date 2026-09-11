import type {
    ICartItem,
    IProduct,
} from "../types/product";

// Constante para la clave de almacenamiento local del carrito
const CART_KEY = "cart";
// Función para convertir el carrito en JSON y guardarlo en el almacenamiento local
const guardarCarrito = (carrito: ICartItem[]): void => {
    localStorage.setItem(
        CART_KEY, // "cart"
        JSON.stringify(carrito)
    );
};

// Función para obtener el carrito desde el almacenamiento local
export const obtenerCarrito = (): ICartItem[] => {
    const carritoGuardado = localStorage.getItem(CART_KEY); // busca "cart"

    if (!carritoGuardado) {
        return [];
    }
    // Devolver el carrito parseado desde JSON
    return JSON.parse(carritoGuardado) as ICartItem[];
};

export const agregarAlCarrito = (
    producto: IProduct
): boolean => {
    if (!producto.disponible || producto.stock <= 0) {
        return false;
    }

    const carrito = obtenerCarrito();

    const itemExistente = carrito.find(
        (item) => item.producto.id === producto.id
    );

    if (itemExistente) {
        if (itemExistente.cantidad >= producto.stock) {
            return false;
        }

        itemExistente.cantidad += 1;
    } else {
        const nuevoItem: ICartItem = {
            producto,
            cantidad: 1,
        };

        carrito.push(nuevoItem);
    }

    guardarCarrito(carrito);
    return true;
};

export const actualizarCantidad = (
    productoId: number,
    nuevaCantidad: number
): void => {
    const carrito = obtenerCarrito();

    if (nuevaCantidad <= 0) {
        const carritoActualizado = carrito.filter(
            (item) => item.producto.id !== productoId
        );

        guardarCarrito(carritoActualizado);
        return;
    }

    const itemEncontrado = carrito.find(
        (item) => item.producto.id === productoId
    );

    if (!itemEncontrado) {
        return;
    }

    itemEncontrado.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
};

export const calcularTotalCarrito = (): number => {
    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, item) =>
            total + item.producto.precio * item.cantidad,
        0
    );
};