import useAvionContext from '../../context/UseContext'

function ClearButton() {

    const { selectedPriceRanges, selectedCategories, sortOrder, clearAllFilters } = useAvionContext()

    const hasActiveFilters = 
        selectedPriceRanges.length > 0 ||
        selectedCategories.length > 0 ||
        sortOrder !== null

    if (!hasActiveFilters) {
        return null
    }

    return (
        <button
            onClick={clearAllFilters}
            className="px-6 h-16 flex items-center justify-center bg-Dark text-Light text-Headline_four font-Open_Sans hover:bg-Primary transition-colors"
            type="button"
        >
            Clear
        </button>
    )
}

export default ClearButton
