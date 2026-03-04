import { useState } from "react"
import { FaCaretDown } from "react-icons/fa"

function ShortingButton() {

    const [openDropdownShorting, setOpenDropdownShorting] = useState('hidden')

  return (
    <div className="relative">
      <button onClick={() => {openDropdownShorting === 'hidden' ? setOpenDropdownShorting('flex') : setOpenDropdownShorting('hidden') }} 
            className="w-56 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_three" type="button">
        Shorting
        <FaCaretDown className="ml-2" />
      </button>
      <div className={`z-10 ${openDropdownShorting} bg-LightGrey border border-default-medium rounded-base shadow-lg w-44 p-4`}>
        <ul>
          <li className='p-4 font-Open_Sans text-Headline_four'>Ascending</li>
          <li className='p-4 font-Open_Sans text-Headline_four'>Descending</li>
        </ul>
      </div>
    </div>
  )
}

export default ShortingButton