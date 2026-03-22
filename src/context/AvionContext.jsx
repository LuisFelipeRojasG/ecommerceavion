import { createContext, useState } from 'react'

const AvionContext = createContext()

const AvionProvider = ({ children }) => {
  const [dataCategories, setDataCategories] = useState([])

  const [dataProducts, setDataProducts] = useState([])

  const [dataProductsCategory, setDataProductsCategory] = useState([])

  const [productDetail, setProductDetail] = useState([])

  const [cartProducts, setCartProducts] = useState([])

  const [openMenu, setOpenMenu] = useState('hidden')

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
      const response = await fetch(url)
      const data = await response.json()
      return setDataCategories(data)

    } catch (error) {
      console.log(error)
    }
  }

  const getAllProducts = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return setDataProducts(data.products)

    } catch (error) {
      console.log(error)
    }
  }

  const getProductsCategory = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return setDataProductsCategory(data.products)

    } catch (error) {
      console.log(error)
    }
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
        priceRanges
      }}
    >
        {children}
    </AvionContext.Provider>
  )
}

export { AvionContext, AvionProvider }
