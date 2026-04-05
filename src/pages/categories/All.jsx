
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import ErrorMessage from '../../components/ErrorMessage'
import useAvionContext from '../../context/UseContext'
import allProducts from '../../assets/pageHeaders.webp'
import AsideOptions from '../../components/filters/AsideOptions'
import { allProductos } from '../../api/indexApi'

function All() {

  // Obtiene productos, función de filtrado, estado de carga y error del contexto
  const { dataProducts, filterAndSortProducts, isLoading, error, getAllProducts } = useAvionContext()

  // Aplica filtros y ordenamiento a los productos
  const displayedProducts = filterAndSortProducts(dataProducts)

  return (
    <div className='grid grid-cols-1'>
      <div className='w-full'>
        <img src={allProducts} alt="All Products Header" className='w-full h-auto' />
      </div>
      {error && <ErrorMessage message={error} onRetry={() => getAllProducts(allProductos)} />}
      <div className='flex flex-col xl:flex-row gap-6 justify-between mx-auto xl:items-start'>
        <AsideOptions
          showCategoryFilter={true}
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

export default All
