
function ClearButton({ onClear, disabled = false }) {
    if (disabled) {
        return null
    }

    return (
        <button
            onClick={onClear}
            className="px-6 h-16 flex items-center justify-center bg-Dark text-Light text-Headline_four font-Open_Sans hover:bg-Primary transition-colors"
            type="button"
        >
            Clear
        </button>
    )
}
export default ClearButton
