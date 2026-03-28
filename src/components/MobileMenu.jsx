import { NavLink } from "react-router"
import useAvionContext from "../context/UseContext";

function MobileMenu() {

    const { setOpenMenu, dataCategories, getProductsCategory } = useAvionContext();

    const handleLinkClick = (action) => {
        if (action) action()
        setOpenMenu('hidden')
    }

  return (
    <div className="lg:hidden bg-BorderGrey">
        <p className="p-4 font-Open_Sans text-Headline_four">
            <NavLink to='/ecommerceavion/all_products' onClick={() => handleLinkClick()}>All Products</NavLink>
        </p>
        {
            dataCategories?.slice(0, 5).map(category => {
                const key = category?.slug || category?.id || category
                    const label = category?.name || category
                    const categoryUrl = category?.url
                    return (
                        <li className='p-4 font-Open_Sans text-Headline_four' key={key}>
                            <NavLink to={`/ecommerceavion/products/${category.slug}`} onClick={() => handleLinkClick(() => getProductsCategory(categoryUrl))}>{label}</NavLink>
                        </li>
                    )
            })
        }
        <p className="p-4 font-Open_Sans text-Headline_four">
            <NavLink to='/ecommerceavion/shopping' onClick={() => handleLinkClick()}>Cart</NavLink>
        </p>
    </div>
  )
}

export default MobileMenu