
import { useState, useMemo } from "react"
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import ErrorMessage from '../../components/ErrorMessage'
import useAvionContext from '../../context/UseContext'
import allProducts from '../../assets/pageHeaders.webp'
import AsideOptions from '../../components/filters/AsideOptions'
import { allProductos } from '../../api/indexApi'

function All() {

  const { dataProducts, isLoading, error, getAllProducts, priceRanges, dataCategories } = useAvionContext()

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortOrder, setSortOrder] = useState(null)

  const togglePriceRange = (range) => {
    setSelectedPriceRanges(prev =>
      prev.find(r => r.label === range.label)
        ? prev.filter(r => r.label !== range.label)
        : [...prev, range]
    )
  }

  const toggleCategory = (slug) => {
    setSelectedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    )
  }

  const clearFilters = () => {
    setSelectedPriceRanges([])
    setSelectedCategories([])
    setSortOrder(null)
  }

  const displayedProducts = useMemo(() => {
    let result = [...dataProducts]

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
    } else if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [dataProducts, selectedPriceRanges, selectedCategories, sortOrder])

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
          selectedPriceRanges={selectedPriceRanges}
          togglePriceRange={togglePriceRange}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          clearFilters={clearFilters}
          priceRanges={priceRanges}
          dataCategories={dataCategories}
        />
        <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-10'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : displayedProducts && displayedProducts.length > 0 ? (
            displayedProducts?.map(product => (
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

export default All
