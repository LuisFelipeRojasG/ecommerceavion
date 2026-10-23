
import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router'
import useAvionContext from '../../context/UseContext'
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import ErrorMessage from '../../components/ErrorMessage'
import AsideOptions from '../../components/filters/AsideOptions'
import { productsByCategory } from '../../api/indexApi'

function Products() {

  const { category } = useParams()

  const {
    dataProductsCategory,
    isLoadingCategoryProducts,
    categoryProductsError,
    getProductsCategory,
    priceRanges,
    filterAndSortProducts
  } = useAvionContext()

  const categoryUrl = productsByCategory(category)

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [sortOrder, setSortOrder] = useState(null)

  // Carga la categoría al entrar directamente o al cambiar de categoría
  useEffect(() => {
    getProductsCategory(categoryUrl)
  }, [categoryUrl, getProductsCategory])

  const togglePriceRange = (range) => {
    setSelectedPriceRanges(prev =>
      prev.find(r => r.label === range.label)
        ? prev.filter(r => r.label !== range.label)
        : [...prev, range]
    )
  }

  const clearFilters = () => {
    setSelectedPriceRanges([])
    setSortOrder(null)
  }

  const displayedProducts = useMemo(() => {
    return filterAndSortProducts(dataProductsCategory, {
      selectedPriceRanges,
      sortOrder
    })
  }, [dataProductsCategory, selectedPriceRanges, sortOrder, filterAndSortProducts])

  return (
    <div className='grid grid-cols-1'>
      {categoryProductsError && (
        <ErrorMessage
          message={categoryProductsError}
          onRetry={() => getProductsCategory(categoryUrl)}
        />
      )}
      <div className='flex flex-col xl:flex-row gap-6 mt-20 justify-between mx-auto'>
        <AsideOptions
          showCategoryFilter={false}
          showPriceFilter={true}
          showSortFilter={true}
          selectedPriceRanges={selectedPriceRanges}
          togglePriceRange={togglePriceRange}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          clearFilters={clearFilters}
          priceRanges={priceRanges}
        />
        <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-10'>
          {isLoadingCategoryProducts ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                data={product}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <p className="text-Headline_two font-Roboto text-Dark">No products available at the moment</p>
              <p className="text-Body_small font-Open_Sans text-Light mt-2">Try adjusting your filters or check back later</p>
            </div>
          )}
        </section>
      </div>
    </div>

  )
}

export default Products
