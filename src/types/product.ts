import type { ICategoria } from "./categoria";
// IProduct representa un producto del catalogo
export interface IProduct {
  id: number;
  eliminado: boolean;
  createdAt: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: ICategoria[];
}
// ICartItem representa un producto agregado al carrito y su cantidad
export interface ICartItem {
  producto: IProduct;
  cantidad: number;
}