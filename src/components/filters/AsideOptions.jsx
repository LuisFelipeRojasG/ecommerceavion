
import FilterButton from '../../components/filters/FilterButton'
import ShortingButton from '../../components/filters/ShortingButton'
import CategoryFilterMobile from './CategoryFilterMobile'
import ClearButton from './ClearButton'

function AsideOptions({
  showCategoryFilter = true,
  showPriceFilter = true,
  showSortFilter = true,
  selectedPriceRanges = [],
  togglePriceRange,
  selectedCategories = [],
  toggleCategory,
  sortOrder = null,
  setSortOrder,
  clearFilters,
  priceRanges = [],
  dataCategories = []
}) {
  // Props para controlar qué filtros se muestran
  // showCategoryFilter: mostrar filtro de categorías (solo en página All)
  // showPriceFilter: mostrar filtro de precio (siempre)
  // showSortFilter: mostrar ordenamiento alfabético (siempre)
  // Los filtros ahora se pasan como props para permitir filtros independientes por página

  // Verifica si hay filtros activos para habilitar/deshabilitar el botón limpiar
  const hasActiveFilters =
    selectedPriceRanges.length > 0 ||
    selectedCategories.length > 0 ||
    sortOrder !== null

  return (
    <aside>
        <div className='grow-0 xl:hidden w-screen h-auto min-h-20 flex flex-wrap justify-center gap-4 mt-10 pb-4'>
            {showPriceFilter && <FilterButton />}
            {showSortFilter && <ShortingButton />}
            {showCategoryFilter && <CategoryFilterMobile />}
            <ClearButton onClear={clearFilters} disabled={!hasActiveFilters} />
        </div>
        <div className='hidden xl:flex flex-col gap-4 w-72 h-auto'>
          <div className='flex justify-end pr-6'>
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className={`px-4 py-2 text-Headline_six font-Open_Sans rounded transition-colors ${
                hasActiveFilters
                  ? 'bg-Dark text-Light cursor-pointer hover:bg-Primary'
                  : 'bg-BorderGrey text-Light cursor-not-allowed opacity-50'
              }`}
            >
              Clear All Filters
            </button>
          </div>

          {/* Filtro de categorías - Solo visible en página All */}
          {showCategoryFilter && (
            <div>
              <h2 className='font-Roboto text-Headline_three pl-6 my-6'>Categories</h2>
              <ul>
                  {
                    dataCategories?.map(category => {
                        const key = category?.slug || category?.id || category
                        const label = category?.name || category
                        return (
                            <li className='px-4 mb-4 font-Open_Sans text-Headline_four' key={key}>
                                  <input
                                    type='checkbox'
                                    className='mx-4'
                                    checked={selectedCategories.includes(category.slug)}
                                    onChange={() => toggleCategory(category.slug)}
                                  />
                                    {label}
                            </li>
                        )
                    })
                  }
              </ul>
            </div>
          )}

          {/* Filtro de precio - Siempre visible */}
          {showPriceFilter && (
            <div>
              <h2 className='font-Roboto text-Headline_three pl-6 my-6'>Filter Price</h2>
              <ul>
                {
                  priceRanges.map(range => (
                    <li key={range.label} className='p-4 font-Open_Sans text-Headline_four'>
                      <input
                        type='checkbox'
                        className='mx-4'
                        checked={selectedPriceRanges.some(r => r.label === range.label)}
                        onChange={() => togglePriceRange(range)}
                      />
                        $ {range.label}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Ordenamiento alfabético - Siempre visible */}
          {showSortFilter && (
            <div>
              <h2 className='font-Roboto text-Headline_three pl-6 my-6'>Sort By</h2>
              <div className='px-6'>
                <select
                  value={sortOrder || ''}
                  onChange={(e) => setSortOrder(e.target.value || null)}
                  className='w-full p-2 border border-Gray rounded text-Headline_five font-Open_Sans'
                >
                  <option value=''>Default</option>
                  <option value='asc'>Name (A - Z)</option>
                  <option value='desc'>Name (Z - A)</option>
                  <option value='price-asc'>Price (Low to High)</option>
                  <option value='price-desc'>Price (High to Low)</option>
                </select>
              </div>
            </div>
          )}

          <div></div>
        </div>
    </aside>
  )
}

export default AsideOptions
