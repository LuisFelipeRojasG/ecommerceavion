import { createContext, useState } from 'react'

const AvionContext = createContext()

const AvionProvider = ({ children }) => {
  const [dataCategories, setDataCategories] = useState([])

  const [dataProducts, setDataProducts] = useState([])

  const [dataProductsCategory, setDataProductsCategory] = useState([])

  const [productDetail, setProductDetail] = useState([])

  /**
   * Estado del carrito de compras con persistencia en localStorage
   * Al iniciar, verifica si hay datos guardados previamente
   */
  const [cartProducts, setCartProducts] = useState(() => {
    const saved = localStorage.getItem('cartProducts')
    return saved ? JSON.parse(saved) : []
  })

  const [openMenu, setOpenMenu] = useState('hidden')

  /**
   * Estado global de carga para todas las operaciones que obtienen datos de la API
   * Se utiliza para mostrar skeletons mientras se cargan los productos
   */
  const [isLoading, setIsLoading] = useState(false)

  // Estados para filtros
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])

  const [selectedCategories, setSelectedCategories] = useState([])

  const [sortOrder, setSortOrder] = useState(null)

  // Rangos de precio disponibles para filtrado
  const priceRanges = [
    { label: "< 10", min: 0, max: 10 },
    { label: "10 - 20", min: 10, max: 20 },
    { label: "20 - 50", min: 20, max: 50 },
    { label: "50 - 100", min: 50, max: 100 },
    { label: "> 100", min: 100, max: Infinity }
  ]

  // Toggle para seleccionar/deseleccionar rangos de precio (acumulativo)
  const togglePriceRange = (range) => {
    setSelectedPriceRanges(prev =>
      prev.find(r => r.label === range.label)
        ? prev.filter(r => r.label !== range.label)
        : [...prev, range]
    )
  }

  // Toggle para seleccionar/deseleccionar categorías (acumulativo)
  const toggleCategory = (slug) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    )
  }

  // Limpiar todos los filtros activos
  const clearAllFilters = () => {
    setSelectedPriceRanges([])
    setSelectedCategories([])
    setSortOrder(null)
  }

  // Filtrar y ordenar productos según los filtros seleccionados
  const filterAndSortProducts = (products) => {
    let result = [...products]

    if (selectedPriceRanges.length > 0) {
      result = result.filter(product =>
        selectedPriceRanges.some(range =>
          product.price >= range.min && product.price <= range.max
        )
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
    }

    return result
  }

  const getAllCategories = async (url) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      return setDataCategories(data)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Obtiene todos los productos desde la API de DummyJSON
   * @param {string} url - Endpoint de la API
   * 
   * Comportamiento:
   * - Activa el estado isLoading antes de la solicitud
   * - Almacena los productos en dataProducts
   * - Desactiva isLoading al completar (éxito o error)
   */
  const getAllProducts = async (url) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      return setDataProducts(data.products)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Obtiene productos de una categoría específica desde la API
   * @param {string} url - Endpoint de la API para la categoría
   * 
   * Comportamiento:
   * - Activa el estado isLoading antes de la solicitud
   * - Almacena los productos en dataProductsCategory
   * - Desactiva isLoading al completar (éxito o error)
   */
  const getProductsCategory = async (url) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      return setDataProductsCategory(data.products)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Agrega un producto al carrito de compras
   * @param {Object} product - Producto a agregar (del API)
   * @param {number} quantity - Cantidad a agregar (default: 1)
   * 
   * Comportamiento:
   * - Valida que la cantidad sea mínimo 1
   * - Si el producto ya existe, incrementa la cantidad
   * - Si es nuevo, lo agrega al carrito
   * - Sincroniza con localStorage para persistencia
   */
  const addToCart = (product, quantity = 1) => {
    const quantityNum = Math.max(1, parseInt(quantity) || 1)
    const newProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
      quantity: quantityNum,
      total: product.price * quantityNum
    }

    setCartProducts(prev => {
      const existingIndex = prev.findIndex(p => p.id === product.id)
      let updatedCart

      if (existingIndex >= 0) {
        updatedCart = prev.map((p, index) => 
          index === existingIndex 
            ? { ...p, quantity: p.quantity + quantityNum, total: p.price * (p.quantity + quantityNum) }
            : p
        )
      } else {
        updatedCart = [...prev, newProduct]
      }

      localStorage.setItem('cartProducts', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  /**
   * Actualiza la cantidad de un producto específico en el carrito
   * @param {string|number} productId - ID del producto a actualizar
   * @param {number} newQuantity - Nueva cantidad (mínimo 1)
   * 
   * Comportamiento:
   * - Valida que la cantidad sea mínimo 1
   * - Recalcula el total (precio * cantidad)
   * - Sincroniza con localStorage
   */
  const updateCartItemQuantity = (productId, newQuantity) => {
    const quantityNum = Math.max(1, parseInt(newQuantity) || 1)
    setCartProducts(prev => {
      const updatedCart = prev.map(p => 
        p.id === productId 
          ? { ...p, quantity: quantityNum, total: p.price * quantityNum }
          : p
      )
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  /**
   * Elimina un producto del carrito
   * @param {string|number} productId - ID del producto a eliminar
   * 
   * Comportamiento:
   * - Filtra el producto del array
   * - Sincroniza con localStorage
   */
  const removeFromCart = (productId) => {
    setCartProducts(prev => {
      const updatedCart = prev.filter(p => p.id !== productId)
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  /**
   * Limpia completamente el carrito
   * 
   * Comportamiento:
   * - Vacía el array de productos
   * - Elimina los datos de localStorage
   */
  const clearCart = () => {
    setCartProducts([])
    localStorage.removeItem('cartProducts')
  }

  /**
   * Calcula el total del carrito
   * @returns {number} Suma de todos los totales de productos
   */
  const getCartTotal = () => {
    return cartProducts.reduce((sum, product) => sum + (product.total || 0), 0)
  }

  /**
   * Cuenta el total de items en el carrito
   * @returns {number} Suma de todas las cantidades
   */
  const getCartItemsCount = () => {
    return cartProducts.reduce((sum, product) => sum + (product.quantity || 1), 0)
  }

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
        dataProductsCategory,
        setDataProductsCategory,
        selectedPriceRanges,
        setSelectedPriceRanges,
        togglePriceRange,
        selectedCategories,
        setSelectedCategories,
        toggleCategory,
        sortOrder,
        setSortOrder,
        clearAllFilters,
        filterAndSortProducts,
        priceRanges,
        isLoading,
        setIsLoading
      }}
    >
        {children}
    </AvionContext.Provider>
  )
}

export { AvionContext, AvionProvider }
