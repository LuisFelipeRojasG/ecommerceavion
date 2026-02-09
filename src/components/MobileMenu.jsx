import { NavLink } from "react-router"
import useAvionContext from "../context/UseContext";

function MobileMenu() {

    const { setOpenMenu, dataCategories } = useAvionContext();

  return (
    <div onClick={() => {
        setOpenMenu('hidden')
    }
    } className="md:hidden bg-BorderGrey">
        {
            dataCategories?.slice(0, 6).map(category => (
                <li className='p-4 font-Open_Sans text-Headline_four' key={category.slug}>
                    <NavLink to={`${category.url}`}>{category.name}</NavLink>
                </li>
            ))
        }
        <p className="p-4 font-Open_Sans text-Headline_four">
            <NavLink to='/shopping'>Cart</NavLink>
        </p>
    </div>
  )
}

export default MobileMenu