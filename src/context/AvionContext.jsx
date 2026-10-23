import { createContext, useState, useCallback, useMemo } from 'react'

const AvionContext = createContext()

const CART_STORAGE_KEY = 'cartProducts'

// Rangos de precio disponibles para filtrado.
// El límite superior es exclusivo salvo en el último rango, así cada precio
// pertenece a un único rango.
const priceRanges = [
  { label: '< 10', min: 0, max: 10, maxInclusive: false },
  { label: '10 - 20', min: 10, max: 20, maxInclusive: false },
  { label: '20 - 50', min: 20, max: 50, maxInclusive: false },
  { label: '50 - 100', min: 50, max: 100 },
  { label: '> 100', min: 100, max: Infinity, minInclusive: false },
]

/**
 * Normaliza un producto del carrito para tolerar datos antiguos o incompletos.
 * @param {Object} item - Producto guardado en el carrito
 * @returns {Object} Producto con cantidad, precio, total e imágenes válidos
 */
const normalizeCartItem = (item = {}) => {
  const quantity = Math.max(1, parseInt(item.quantity, 10) || 1)
  const price = Number(item.price) || 0

  return {
    ...item,
    quantity,
    price,
    total: price * quantity,
    images: Array.isArray(item.images) ? item.images : []
  }
}

/**
 * Lee el carrito desde localStorage sin romper la app si los datos son inválidos.
 * @returns {Array} Lista normalizada de productos
 */
const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed.map(normalizeCartItem) : []
  } catch (error) {
    console.log(error)
    return []
  }
}

/**
 * Persiste el carrito en localStorage.
 * @param {Array} cart - Productos a guardar
 */
const persistCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.log(error)
  }
}

/**
 * Comprueba si un precio pertenece a un rango.
 * @param {number} price - Precio del producto
 * @param {Object} range - Rango con min, max y límites inclusivos/exclusivos
 * @returns {boolean}
 */
const matchesPriceRange = (price, range) => {
  const aboveMin = range.minInclusive === false ? price > range.min : price >= range.min
  const belowMax = range.maxInclusive === false ? price < range.max : price <= range.max
  return aboveMin && belowMax
}

const AvionProvider = ({ children }) => {
  const [dataCategories, setDataCategories] = useState([])

  const [dataProducts, setDataProducts] = useState([])

  const [dataProductsCategory, setDataProductsCategory] = useState([])

  const [productDetail, setProductDetail] = useState(null)

  /**
   * Estado del carrito de compras con persistencia en localStorage
   * Al iniciar, verifica si hay datos guardados previamente
   */
  const [cartProducts, setCartProducts] = useState(loadCart)

  const [openMenu, setOpenMenu] = useState('hidden')

  /**
   * Estado de carga para la lista general de productos
   */
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Error de la lista general de productos
   */
  const [error, setError] = useState(null)

  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  const [categoriesError, setCategoriesError] = useState(null)

  const [isLoadingCategoryProducts, setIsLoadingCategoryProducts] = useState(false)

  const [categoryProductsError, setCategoryProductsError] = useState(null)

  const [isLoadingDetail, setIsLoadingDetail] = useState(false)

  const [detailError, setDetailError] = useState(null)

  /**
   * Estado para el toast de notificación flotante
   */
  const [toast, setToast] = useState(null)

  /**
   * Muestra un toast de notificación
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de toast ('success' | 'error' | 'info')
   */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  /**
   * Oculta el toast actual
   */
  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  const getAllCategories = useCallback(async (url) => {
    try {
      setIsLoadingCategories(true)
      setCategoriesError(null)

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load categories')

      const data = await response.json()
      setDataCategories(data)
    } catch (error) {
      console.log(error)
      setCategoriesError('Failed to load categories. Please try again.')
    } finally {
      setIsLoadingCategories(false)
    }
  }, [])

  /**
   * Obtiene todos los productos desde la API de DummyJSON
   * @param {string} url - Endpoint de la API
   */
  const getAllProducts = useCallback(async (url) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load products')

      const data = await response.json()
      setDataProducts(data.products || [])
    } catch (error) {
      console.log(error)
      setError('Failed to load products. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Obtiene productos de una categoría específica desde la API
   * @param {string} url - Endpoint de la API para la categoría
   */
  const getProductsCategory = useCallback(async (url) => {
    try {
      setIsLoadingCategoryProducts(true)
      setCategoryProductsError(null)
      setDataProductsCategory([])

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load category products')

      const data = await response.json()
      setDataProductsCategory(data.products || [])
    } catch (error) {
      console.log(error)
      setCategoryProductsError('Failed to load category products. Please try again.')
    } finally {
      setIsLoadingCategoryProducts(false)
    }
  }, [])

  /**
   * Obtiene un producto por ID, usado al entrar directamente al detalle
   * o al recargar la página.
   * @param {string} url - Endpoint del producto
   */
  const getProductById = useCallback(async (url) => {
    try {
      setIsLoadingDetail(true)
      setDetailError(null)

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load product')

      const data = await response.json()
      setProductDetail(data)
    } catch (error) {
      console.log(error)
      setDetailError('Failed to load product. Please try again.')
      setProductDetail(null)
    } finally {
      setIsLoadingDetail(false)
    }
  }, [])

  /**
   * Agrega un producto al carrito de compras
   * @param {Object} product - Producto a agregar (del API)
   * @param {number} quantity - Cantidad a agregar (default: 1)
   */
  const addToCart = useCallback((product, quantity = 1) => {
    const quantityNum = Math.max(1, parseInt(quantity, 10) || 1)
    const existing = cartProducts.find(p => p.id === product.id)
    let updatedCart
    let message

    if (existing) {
      updatedCart = cartProducts.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + quantityNum, total: p.price * (p.quantity + quantityNum) }
          : p
      )
      message = `${product.title} quantity updated!`
    } else {
      updatedCart = [...cartProducts, normalizeCartItem({ ...product, quantity: quantityNum })]
      message = `${product.title} added to cart!`
    }

    setCartProducts(updatedCart)
    persistCart(updatedCart)
    showToast(message, 'success')
  }, [cartProducts, showToast])

  /**
   * Actualiza la cantidad de un producto específico en el carrito
   * @param {string|number} productId - ID del producto a actualizar
   * @param {number} newQuantity - Nueva cantidad (mínimo 1)
   */
  const updateCartItemQuantity = useCallback((productId, newQuantity) => {
    const quantityNum = Math.max(1, parseInt(newQuantity, 10) || 1)
    const updatedCart = cartProducts.map(p =>
      p.id === productId
        ? { ...p, quantity: quantityNum, total: p.price * quantityNum }
        : p
    )

    setCartProducts(updatedCart)
    persistCart(updatedCart)
  }, [cartProducts])

  /**
   * Elimina un producto del carrito
   * @param {string|number} productId - ID del producto a eliminar
   */
  const removeFromCart = useCallback((productId) => {
    const updatedCart = cartProducts.filter(p => p.id !== productId)

    setCartProducts(updatedCart)
    persistCart(updatedCart)
  }, [cartProducts])

  /**
   * Limpia completamente el carrito
   */
  const clearCart = useCallback(() => {
    setCartProducts([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }, [])

  /**
   * Calcula el total del carrito.
   * @returns {number} Suma de precio * cantidad de cada producto
   */
  const getCartTotal = useMemo(() => {
    return () => cartProducts.reduce(
      (sum, product) => sum + (Number(product.price) || 0) * (Number(product.quantity) || 0),
      0
    )
  }, [cartProducts])

  /**
   * Cuenta el total de items en el carrito.
   * @returns {number} Suma de todas las cantidades
   */
  const getCartItemsCount = useMemo(() => {
    return () => cartProducts.reduce(
      (sum, product) => sum + (Number(product.quantity) || 1),
      0
    )
  }, [cartProducts])

  /**
   * Filtra y ordena productos según los filtros recibidos.
   * Es una función pura para que cada página mantenga sus propios filtros.
   * @param {Array} products - Productos a procesar
   * @param {Object} filters - selectedPriceRanges, selectedCategories y sortOrder
   * @returns {Array} Productos filtrados y ordenados
   */
  const filterAndSortProducts = useCallback((products, filters = {}) => {
    const {
      selectedPriceRanges = [],
      selectedCategories = [],
      sortOrder = null
    } = filters

    let result = [...(products || [])]

    if (selectedPriceRanges.length > 0) {
      result = result.filter(product =>
        selectedPriceRanges.some(range => matchesPriceRange(product.price, range))
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.category)
      )
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [])

  return (
    <AvionContext.Provider
      value={{
        dataProducts,
        dataCategories,
        productDetail,
        setProductDetail,
        cartProducts,
        setCartProducts,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        getAllCategories,
        openMenu,
        setOpenMenu,
        getAllProducts,
        getProductsCategory,
        getProductById,
        dataProductsCategory,
        setDataProductsCategory,
        priceRanges,
        filterAndSortProducts,
        isLoading,
        setIsLoading,
        error,
        setError,
        isLoadingCategories,
        categoriesError,
        isLoadingCategoryProducts,
        categoryProductsError,
        isLoadingDetail,
        detailError,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AvionContext.Provider>
  )
}

export { AvionContext, AvionProvider }
