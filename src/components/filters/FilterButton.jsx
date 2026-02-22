import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"

function FilterButton() {

    const [openDropdownFilter, setOpenDropdownFilter] = useState('hidden')
    const arrayPrice = ["< 10", "20 - 50", "50 - 100", "> 100"]

  return (
    <>
      <button onClick={() => {openDropdownFilter === 'hidden' ? setOpenDropdownFilter('flex') : setOpenDropdownFilter('hidden') }} 
            className="w-40 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_five" type="button">
        Filter
        <FaCaretDown className="ml-2" />
      </button>
      <div className={`z-10 ${openDropdownFilter} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 p-4`}>
        <ul>
          {
            arrayPrice.map(price => (
              <li key={price}>
                <button type="radio" className="p-2">
                  ${price}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  )
}

export default FilterButton