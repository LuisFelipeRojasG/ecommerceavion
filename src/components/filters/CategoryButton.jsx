import useAvionContext from '../../context/UseContext'
import { NavLink } from 'react-router'
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"

function CategoryButton() {

    const { dataCategories, getProductsCategory } = useAvionContext()
    const [ openDropdownCategory, setOpenDropdownCategory ] = useState('hidden')

  return (
    <div className="relative">
        <button onClick={() => {openDropdownCategory === 'hidden' ? setOpenDropdownCategory('flex') : setOpenDropdownCategory('hidden') }} 
            className="w-56 h-16 py-6 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_three" type="button">
            Categories
            <FaCaretDown className="ml-2" />
        </button>
        <div className={`z-10 ${openDropdownCategory} w-60 p-4 bg-LightGrey border border-default-medium rounded-base shadow-lg `}>
            <ul>
                {
                    dataCategories?.map(category => {
                        const key = category?.slug || category?.id || category
                        const label = category?.name || category
                        const categoryUrl = category?.url
                        return (
                            <li className='p-4 font-Open_Sans text-Headline_four' key={key}>
                                <NavLink to={`/products/${category.slug}`} onClick={() => {
                                    getProductsCategory(categoryUrl)
                                }}>{label}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default CategoryButton