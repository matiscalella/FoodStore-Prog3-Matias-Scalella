# Food Store - Evaluación 1

Proyecto desarrollado para la **Evaluación 1 de Programación III** de la Tecnicatura Universitaria en Programación.

La aplicación representa una tienda de comidas en la que un usuario puede registrarse, iniciar sesión, consultar un catálogo, buscar y filtrar productos, agregarlos a un carrito y visualizar el total de su compra.

## Enlace Video
[Explicacion del codigo](XXXXXXXXXXXXXXXXXX)

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite
- `localStorage` para la persistencia de datos
- pnpm como gestor de paquetes

El proyecto no utiliza frameworks de frontend, backend ni base de datos.

## Funcionalidades

### Autenticación y rutas

- Registro de usuarios con rol `client`.
- Inicio de sesión mediante correo electrónico y contraseña.
- Redirección según el rol del usuario.
- Protección básica de las páginas de cliente y administrador.
- Cierre de sesión.
- Creación automática de un usuario administrador predeterminado.

Credenciales del administrador de prueba:

```text
Email: admin@gmail.com
Contraseña: admin123
```

La autenticación y la protección de rutas provienen del Trabajo Práctico Integrador anterior.

### Catálogo de productos

- Carga dinámica de productos y categorías desde `src/data/data.ts`.
- Visualización de imagen, nombre, descripción, precio y stock.
- Búsqueda por coincidencia total o parcial del nombre.
- Filtrado de productos por categoría.
- Opción para volver a visualizar todos los productos.
- Mensaje cuando una búsqueda no obtiene resultados.
- Exclusión de productos marcados como eliminados.

### Carrito de compras

- Incorporación de productos desde el catálogo.
- Actualización de la cantidad cuando un producto ya está agregado.
- Control de la cantidad disponible según el stock.
- Indicador de la cantidad total de unidades en el carrito.
- Visualización del nombre, imagen, precio, cantidad y subtotal de cada producto.
- Modificación de cantidades desde la vista del carrito.
- Cálculo y actualización del total general.
- Mensaje cuando el carrito está vacío.
- Persistencia del contenido mediante `localStorage` bajo la clave `cart`.

No se implementa checkout ni conexión con un backend.

## Funcionamiento general

Al ingresar a la aplicación se presenta la página de inicio, desde la cual se puede acceder al registro o al inicio de sesión.

Un usuario nuevo debe registrarse con un correo electrónico y una contraseña. Las nuevas cuentas reciben automáticamente el rol `client`. Después puede iniciar sesión y acceder al catálogo.

En el catálogo, los productos se generan dinámicamente a partir de los datos definidos en `data.ts`. El usuario puede buscar un producto por nombre, seleccionar una categoría o agregar productos al carrito. La lógica del carrito comprueba el stock y guarda la selección en `localStorage`.

La página del carrito recupera esos datos, muestra los productos agregados y calcula el importe total a partir del precio y la cantidad de cada ítem. Debido al uso de `localStorage`, la información se mantiene al recargar la página en el mismo navegador.

## Estructura del proyecto

```text
food_store/
├── public/
│   └── assets/
│       └── products/              # Imágenes de los productos
├── src/
│   ├── data/
│   │   └── data.ts                # Productos y categorías
│   ├── pages/
│   │   ├── admin/
│   │   │   └── home/              # Página principal del administrador
│   │   ├── auth/
│   │   │   ├── login/             # Inicio de sesión
│   │   │   └── registro/          # Registro de usuarios
│   │   └── client/
│   │       ├── home/              # Catálogo, búsqueda y filtros
│   │       └── cart/              # Vista y renderizado del carrito
│   ├── types/
│   │   ├── categoria.ts           # Interface ICategoria
│   │   ├── IUser.ts               # Interface IUser
│   │   ├── product.ts             # Interfaces IProduct e ICartItem
│   │   └── Rol.ts                 # Tipo de rol de usuario
│   ├── utils/
│   │   ├── auth.ts                # Validación de sesión y roles
│   │   ├── cart.ts                # Operaciones reutilizables del carrito
│   │   ├── localStorage.ts        # Persistencia de usuarios
│   │   └── navigate.ts            # Redirección entre páginas
│   ├── main.ts                    # Protección de rutas
│   └── style.css                  # Estilos generales y adaptables
├── index.html                     # Página de entrada
├── package.json                   # Dependencias y scripts
├── pnpm-lock.yaml                 # Versiones de dependencias
├── tsconfig.json                  # Configuración de TypeScript
└── vite.config.ts                 # Configuración multipágina de Vite
```

Cada página posee su archivo HTML y su archivo TypeScript. Las vistas se encargan de renderizar elementos y escuchar eventos, mientras que la lógica reutilizable del carrito se encuentra centralizada en `src/utils/cart.ts`.

## Persistencia local

La aplicación utiliza las siguientes claves de `localStorage`:

- `users`: usuarios registrados.
- `userData`: usuario que tiene la sesión iniciada.
- `cart`: productos agregados al carrito.

Los datos se almacenan únicamente en el navegador. Para reiniciar completamente la aplicación se pueden eliminar estas claves desde las herramientas de desarrollo del navegador.

## Requisitos previos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- pnpm

Si pnpm no está habilitado, puede activarse mediante Corepack:

```bash
corepack enable pnpm
```

## Instalación

1. Descomprimir el archivo del proyecto.
2. Abrir una terminal dentro de la carpeta raíz.
3. Instalar las dependencias:

```bash
pnpm install
```

## Ejecutar en modo desarrollo

Iniciar el servidor de desarrollo con:

```bash
pnpm dev
```

Luego abrir en el navegador la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Generar y comprobar la versión de producción

Crear el build con:

```bash
pnpm build
```

El resultado se genera dentro de la carpeta `dist/`. Para comprobarlo localmente, ejecutar:

```bash
pnpm preview
```

Luego abrir la dirección indicada por Vite, normalmente:

```text
http://localhost:4173
```

Las páginas HTML de inicio, autenticación, administración, catálogo y carrito están registradas en `vite.config.ts` para que Vite las incluya en el build.

## Autor

**Matías Scalella**  
Programación III - Tecnicatura Universitaria en Programación
