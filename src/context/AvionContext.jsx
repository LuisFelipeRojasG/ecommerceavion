import { createContext, useState } from 'react'

const AvionContext = createContext()

const AvionProvider = ({ children }) => {
  //Para guardar los productos de la categoria seleccionada
  const [dataCategories, setDataCategories] = useState([])

  const [dataProducts, setDataProducts] = useState([])

  const [productDetail, setProductDetail] = useState([])

  const [cartProducts, setCartProducts] = useState([])

  const [openMenu, setOpenMenu] = useState('hidden')

  const getAllProducts = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return setDataProducts(data.products)
      
    } catch (error) {
      console.log(error)
    }
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
          getAllProducts
      }}
    >
        {children}
    </AvionContext.Provider>
  )
}

export { AvionContext, AvionProvider }
