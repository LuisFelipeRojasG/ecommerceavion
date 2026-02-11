import { createContext, useState } from 'react'

const AvionContext = createContext()

const AvionProvider = ({ children }) => {
  //Para guardar las categorias y productos obtenidos de la API
  const [dataCategories, setDataCategories] = useState([])

  const [dataProducts, setDataProducts] = useState([])

  //Se obtiene los productos de la categoria seleccionada
  const [dataProductsCategory, setDataProductsCategory] = useState([])

  

  const [productDetail, setProductDetail] = useState([])

  const [cartProducts, setCartProducts] = useState([])

  const [openMenu, setOpenMenu] = useState('hidden')

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
          //selectedCategoryUrl,
          //setSelectedCategoryUrl
      }}
    >
        {children}
    </AvionContext.Provider>
  )
}

export { AvionContext, AvionProvider }
