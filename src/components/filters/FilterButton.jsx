import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"

function FilterButton() {

    const [ openDropdownFilter, setOpenDropdownFilter ] = useState('hidden')
    const arrayPrice = ["< 10", "20 - 50", "50 - 100", "> 100"]

  return (
    <div className="relative">
      <button onClick={() => {openDropdownFilter === 'hidden' ? setOpenDropdownFilter('flex') : setOpenDropdownFilter('hidden') }} 
            className="w-56 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_three" type="button">
        Filter
        <FaCaretDown className="ml-2" />
      </button>
      <div className={`z-10 ${openDropdownFilter} bg-LightGrey border border-default-medium rounded-base shadow-lg w-44 p-4`}>
        <ul>
          {
            arrayPrice.map(price => (
              <li  key={price} className='p-4 font-Open_Sans text-Headline_four'>
                <button type="radio" className="p-2">
                  $ {price}
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