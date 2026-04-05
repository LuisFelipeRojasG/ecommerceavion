
import { useParams } from 'react-router'
import useAvionContext from '../../context/UseContext'
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import ErrorMessage from '../../components/ErrorMessage'
import AsideOptions from '../../components/filters/AsideOptions'

function Products() {

  const { category } = useParams()
  
  // Obtiene productos de categoría, función de filtrado, estado de carga y error del contexto
  const { dataProductsCategory, filterAndSortProducts, isLoading, error, getProductsCategory } = useAvionContext()

  // URL de la API para reintentar
  const categoryUrl = `https://dummyjson.com/products/category/${category}`

  // Aplica filtros y ordenamiento a los productos de la categoría
  const displayedProducts = filterAndSortProducts(dataProductsCategory)

  return (
    <div className='grid grid-cols-1'>
      {error && <ErrorMessage message={error} onRetry={() => getProductsCategory(categoryUrl)} />}
      <div className='flex flex-col xl:flex-row gap-6 mt-20 justify-between mx-auto'>
        <AsideOptions
          showCategoryFilter={false}
          showPriceFilter={true}
          showSortFilter={true}
        />
        <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-10'>
          {isLoading ? (
            // Mostrar skeletons mientras carga - 8 skeletons para mantener consistencia visual
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            displayedProducts?.map(product => (
              <ProductCard
                key={product.id}
                data={product}
              />
            ))
          )}
        </section>
      </div>
    </div>

  )
}

export default Products
