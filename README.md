# Avion E-Commerce

Tienda en línea construida con React, Vite y Tailwind CSS. Consume datos de la API pública DummyJSON para productos y categorías.

## Características

### Funcionalidades del Carrito
- Añadir productos al carrito con cantidad variable
- Actualizar cantidad de productos directamente
- Eliminar productos individuales
- Persistencia del carrito en localStorage
- Checkout con mensaje de confirmación

### Navegación y Filtrado
- Búsqueda de productos en tiempo real
- Filtro por categorías
- Filtro por rangos de precio
- Ordenamiento: A-Z, Z-A, precio (asc/desc)
- Menú responsive para móviles

### Experiencia de Usuario
- Skeletons de carga mientras se obtienen datos
- Mensajes de error con opción de reintentar
- Notificaciones toast al añadir productos
- Estados de focus visibles para accesibilidad
- Soporte para `prefers-reduced-motion`

### UI/UX
- Diseño responsive (mobile-first)
- Modal de detalles de producto
- Rating de productos visible
- Imágenes con lazy loading

## Tecnologías

- **Frontend:** React 18 + Vite
- **Estilos:** Tailwind CSS
- **Routing:** React Router v7
- **Estado:** Context API
- **API:** DummyJSON (productos, categorías, búsqueda)
- **Despliegue:** GitHub Pages

## Scripts

```bash
# Desarrollo
npm run dev              # Iniciar servidor con HMR

# Producción
npm run build            # Construir para producción
npm run preview          # Previsualizar build

# Calidad de código
npm run lint             # Verificar con ESLint
npm run lint -- --fix    # Auto-corregir problemas

# Despliegue
npm run deploy           # Construir y desplegar a GitHub Pages
```

## Estructura del Proyecto

```
src/
├── api/              # Endpoints de la API
├── assets/           # Imágenes estáticas
├── components/       # Componentes reutilizables
│   └── filters/      # Componentes de filtrado
├── context/          # AvionContext (estado global)
├── pages/            # Componentes de página
│   └── categories/  # Páginas de categoría
├── App.jsx           # Configuración de rutas
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

## Variables de Entorno

No requiere variables de entorno. El proyecto usa la API pública de DummyJSON:
- Base URL: `https://dummyjson.com`

## Despliegue

El proyecto está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

URL de producción: https://luisfeliperojasg.github.io/ecommerceAvion/

## Licencia

MIT
