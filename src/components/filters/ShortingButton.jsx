import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"

function ShortingButton() {

    const [openDropdownShorting, setOpenDropdownShorting] = useState('hidden')

  return (
    <>
      <button onClick={() => {openDropdownShorting === 'hidden' ? setOpenDropdownShorting('flex') : setOpenDropdownShorting('hidden') }} 
            className="w-40 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_five" type="button">
        Shorting
        <FaCaretDown className="ml-2" />
      </button>
      <div className={`z-10 ${openDropdownShorting} bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 p-4`}>
        <ul>
          <li>Ascending</li>
          <li>Descending</li>
        </ul>
      </div>
    </>
  )
}

export default ShortingButton