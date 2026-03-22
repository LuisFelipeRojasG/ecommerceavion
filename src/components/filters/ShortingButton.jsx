import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import useAvionContext from '../../context/UseContext'

function ShortingButton() {

    const { sortOrder, setSortOrder } = useAvionContext()
    const [openDropdownShorting, setOpenDropdownShorting] = useState('hidden')

    const handleSort = (order) => {
        setSortOrder(order)
        setOpenDropdownShorting('hidden')
    }

    return (
        <div className="relative">
            <button 
                onClick={() => openDropdownShorting === 'hidden' ? setOpenDropdownShorting('flex') : setOpenDropdownShorting('hidden')} 
                className="w-56 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_three" 
                type="button"
            >
                Shorting
                <FaCaretDown className="ml-2" />
            </button>
            <div className={`z-10 ${openDropdownShorting} absolute top-full left-0 bg-LightGrey border border-default-medium rounded-base shadow-lg w-44 p-4`}>
                <ul>
                    <li 
                        className={`p-4 font-Open_Sans text-Headline_four cursor-pointer ${sortOrder === 'asc' ? 'bg-Dark text-Light' : ''}`}
                        onClick={() => handleSort('asc')}
                    >
                        Ascending (A-Z)
                    </li>
                    <li 
                        className={`p-4 font-Open_Sans text-Headline_four cursor-pointer ${sortOrder === 'desc' ? 'bg-Dark text-Light' : ''}`}
                        onClick={() => handleSort('desc')}
                    >
                        Descending (Z-A)
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ShortingButton
