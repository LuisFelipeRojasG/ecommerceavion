import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import useAvionContext from '../../context/UseContext'

function FilterButton() {

    const { priceRanges, togglePriceRange, selectedPriceRanges } = useAvionContext()
    const [openDropdownFilter, setOpenDropdownFilter] = useState('hidden')

    const handlePriceSelect = (range) => {
        togglePriceRange(range)
        setOpenDropdownFilter('hidden')
    }

    return (
        <div className="relative">
            <button 
                onClick={() => openDropdownFilter === 'hidden' ? setOpenDropdownFilter('flex') : setOpenDropdownFilter('hidden')} 
                className="w-56 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_three" 
                type="button"
            >
                Filter
                <FaCaretDown className="ml-2" />
            </button>
            <div className={`z-10 ${openDropdownFilter} absolute top-full left-0 bg-LightGrey border border-default-medium rounded-base shadow-lg w-44 p-4`}>
                <ul>
                    {
                        priceRanges.map(range => (
                            <li key={range.label} className='p-4 font-Open_Sans text-Headline_four'>
                                <button 
                                    type="button" 
                                    className="flex items-center gap-2 w-full text-left"
                                    onClick={() => handlePriceSelect(range)}
                                >
                                    <span className={`w-4 h-4 border border-Gray rounded flex items-center justify-center ${selectedPriceRanges.some(r => r.label === range.label) ? 'bg-Dark' : 'bg-White'}`}>
                                        {
                                            selectedPriceRanges.some(r => r.label === range.label) && (
                                                <span className="text-White text-xs">✓</span>
                                            )
                                        }
                                    </span>
                                    $ {range.label}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    )
}

export default FilterButton
