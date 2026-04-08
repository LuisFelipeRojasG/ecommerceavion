import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"

function CategoryFilterMobile({ dataCategories = [], toggleCategory, selectedCategories = [] }) {
    const [openDropdownCategory, setOpenDropdownCategory] = useState('hidden')

    const handleCategorySelect = (slug) => {
        toggleCategory(slug)
        setOpenDropdownCategory('hidden')
    }

    return (
        <div className="relative">
            <button 
                onClick={() => openDropdownCategory === 'hidden' ? setOpenDropdownCategory('flex') : setOpenDropdownCategory('hidden')} 
                className="w-56 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_three" 
                type="button"
            >
                Categories
                <FaCaretDown className="ml-2" />
            </button>
            <div className={`z-10 ${openDropdownCategory} absolute top-full left-0 bg-LightGrey border border-default-medium rounded-base shadow-lg w-60 p-4`}>
                <ul>
                    {
                        dataCategories?.map(category => {
                            const key = category?.slug || category?.id || category
                            const label = category?.name || category
                            return (
                                <li key={key} className='p-4 font-Open_Sans text-Headline_four'>
                                    <button 
                                        type="button" 
                                        className="flex items-center gap-2 w-full text-left"
                                        onClick={() => handleCategorySelect(category.slug)}
                                    >
                                        <span className={`w-4 h-4 border border-Gray rounded flex items-center justify-center ${selectedCategories.includes(category.slug) ? 'bg-Dark' : 'bg-White'}`}>
                                            {
                                                selectedCategories.includes(category.slug) && (
                                                    <span className="text-White text-xs">✓</span>
                                                )
                                            }
                                        </span>
                                        {label}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CategoryFilterMobile
