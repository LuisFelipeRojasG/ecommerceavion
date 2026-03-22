# AGENTS.md

## Project Overview
React + Vite e-commerce application (Avion) using Tailwind CSS, React Router 7, and Context API for state management. Fetches product data from the DummyJSON API.

---

## Build/Lint/Test Commands

```bash
# Development
npm run dev              # Start Vite dev server with HMR

# Production
npm run build            # Build for production (output: dist/)
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint with strict rules
npm run lint -- --fix    # Auto-fix ESLint issues

# Styling
npm run tw:build         # Build Tailwind CSS with watch mode

# Deployment
npm run deploy           # Build and deploy to GitHub Pages (gh-pages)
```

> **Note:** No test framework is currently configured. Avoid writing tests unless explicitly requested.

---

## Code Style Guidelines

### File Structure
```
src/
├── api/              # API configuration and endpoints
├── assets/           # Static assets (images, fonts)
├── components/       # Reusable UI components
│   └── filters/      # Filter-related components
├── context/          # React Context providers and hooks
├── pages/            # Page-level components
│   └── categories/   # Category-specific pages
├── App.jsx           # Root component with routing
├── main.jsx          # Application entry point
└── index.css         # Tailwind imports and global styles
```

### Naming Conventions
- **Components:** PascalCase (e.g., `ProductCard.jsx`, `NavBar.jsx`)
- **Files:** Match component names exactly
- **Custom Hooks:** `use` prefix + PascalCase (e.g., `useAvionContext`)
- **Context/Providers:** PascalCase (e.g., `AvionContext`, `AvionProvider`)
- **API endpoints:** camelCase (e.g., `allProductos`, `allCategories`)
- **CSS classes:** kebab-case with Tailwind utilities

### Import Order
1. React imports (`react`)
2. External library imports (`react-router`, `react-icons`)
3. Internal imports (contexts, components, pages, api)
4. Asset imports (images, styles)

### React Conventions
- **Functional components only** - No class components
- **Default exports** for page/component files
- **Named exports** for contexts and custom hooks
- **Always use JSX** - Never `React.createElement`
- **Prop types:** Disabled (`"react/prop-types": "off"`)
- **StrictMode:** Enabled in `main.jsx`

### State Management (Context API)
```jsx
// Create custom hook for context consumption
const useAvionContext = () => {
    const context = useContext(AvionContext)
    if (!context) {
        throw new Error('useAvionContext must be used within a AvionProvider')
    }
    return context
}

// Wrap app with Provider
<AvionProvider>
    {/* children */}
</AvionProvider>
```

### Error Handling
- Use `try-catch` blocks for async operations (API calls)
- Log errors with `console.log(error)` (no external logger)
- Consider adding user-facing error states in production

### Code Documentation
- **Funciones complejas:** Agregar comentarios JSDoc explicando propósito, parámetros y comportamiento
- **Lógica de negocio:** Documentar decisiones importantes dentro del código
- **Funciones del carrito:** Mantener documentación actualizada de `addToCart`, `updateCartItemQuantity`, `removeFromCart`, `clearCart`, `getCartTotal`, `getCartItemsCount`

### Shopping Cart Features
El carrito de compras implementa las siguientes funcionalidades:

| Función | Descripción |
|---------|-------------|
| `addToCart(product, quantity)` | Agrega producto, valida cantidad (min 1), maneja duplicados incrementando cantidad, persiste en localStorage |
| `updateCartItemQuantity(productId, quantity)` | Actualiza cantidad de producto específico, recalcula total |
| `removeFromCart(productId)` | Elimina producto del carrito |
| `clearCart()` | Vacía el carrito completamente |
| `getCartTotal()` | Retorna suma de todos los totales |
| `getCartItemsCount()` | Retorna suma de cantidades |
| Persistencia | Los productos se guardan en `localStorage` bajo la clave `cartProducts` |

### Styling with Tailwind CSS

**Custom Colors (defined in tailwind.config.js):**
```css
/* Backgrounds */
bg-DarkPrimary / bg-Primary / bg-LightGrey / bg-BorderGrey / bg-White

/* Text */
text-Dark / text-Primary / text-Light

/* Borders */
border-Gray
```

**Custom Fonts:**
```css
font-Roboto      /* For headings */
font-Open_Sans   /* For body/navigation */
```

**Custom Font Sizes:**
```css
/* Headings */
text-Headline_one  (36px, weight 500)
text-Headline_two  (32px, weight 500)
text-Headline_three (24px, weight 500)
text-Headline_four  (20px, weight 500)
text-Headline_five  (16px, weight 500)
text-Headline_six   (14px, weight 500)

/* Body */
text-Body_small  (16px, weight 400)
text-Body_medium (20px, weight 400)
text-Body_large (24px, weight 400)
```

### Component Patterns

**Presentational Component:**
```jsx
import useAvionContext from '../context/UseContext'

function ProductCard({ data }) {
  const { setProductDetail } = useAvionContext()

  return (
    <article className='flex flex-col gap-4'>
      <figure>
        <img src={data.images[0]} alt={data.title} />
      </figure>
      <div className='flex justify-between'>
        <span className='text-Headline_four'>{data.title}</span>
        <button onClick={() => handleClick(data)}>Details</button>
      </div>
    </article>
  )
}

export default ProductCard
```

**Page Component:**
```jsx
import ProductCart from "../components/ProductCart";

function Shopping() {
  return <ProductCart />
}

export default Shopping
```

**Async Data Fetching:**
```jsx
const getAllProducts = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return setDataProducts(data.products)
  } catch (error) {
    console.log(error)
  }
}
```

### Routing
Uses `react-router` v7 with nested routes:
```jsx
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shopping" element={<Shopping />} />
      <Route path="/detail" element={<Detail />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### ESLint Configuration
- **extends:** `eslint:recommended`, `react/recommended`, `react/jsx-runtime`, `react-hooks/recommended`
- **plugins:** `react-refresh`
- **Disabled:** `react/prop-types`
- **react-refresh rule:** Only warn for non-constant exports

---

## Environment Notes
- No `.env` file required (uses public DummyJSON API)
- Build output goes to `dist/` directory
- Deployed to GitHub Pages at `https://luisfeliperojasg.github.io/ecommerceAvion/`

## Dependencies
- **React:** ^18.2.0
- **React Router:** ^7.13
- **Tailwind CSS:** ^3.4.1
- **Headless UI:** ^2.2.0 (UI components)
- **React Icons:** ^5.0.1

## Development Tools
- **Vite:** ^7.3.1 (build tool)
- **ESLint:** ^8.55.0
- **gh-pages:** ^6.3.0 (deployment)
