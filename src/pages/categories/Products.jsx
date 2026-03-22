
import useAvionContext from '../../context/UseContext'
import ProductCard from '../../components/ProductCard'
import AsideOptions from '../../components/filters/AsideOptions'

function Products() {

  // Obtiene productos de categoría y función de filtrado del contexto
  const { dataProductsCategory, filterAndSortProducts } = useAvionContext()

  // Aplica filtros y ordenamiento a los productos de la categoría
  const displayedProducts = filterAndSortProducts(dataProductsCategory)

  return (
    <div className='grid grid-cols-1'>
      <div className='flex flex-col xl:flex-row gap-6 mt-20 justify-center'>
        <AsideOptions
          showCategoryFilter={false}
          showPriceFilter={true}
          showSortFilter={true}
        />
        <section className='grow grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-10'>
          {
            displayedProducts?.map(product => (
              <ProductCard
                key={product.id}
                data={product}
              />
            ))
          }
        </section>
      </div>
    </div>

  )
}

export default Products
