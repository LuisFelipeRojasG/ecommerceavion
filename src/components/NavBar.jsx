import { useState, useMemo, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { IoCartOutline } from 'react-icons/io5'
import { IoMdMenu } from 'react-icons/io'
import useAvionContext from '../context/UseContext'
import MobileMenu from './MobileMenu'
import logo from '../assets/group98.png'
import { allCategories } from '../api/indexApi'

function NavBar() {

    const { openMenu, setOpenMenu, getAllCategories, dataCategories, getProductsCategory, getCartItemsCount, cartProducts } = useAvionContext()
    const navigate = useNavigate()
    
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    /**
     * useMemo para evitar re-renders innecesarios
     * getCartItemsCount() se ejecuta en cada render sin esto
     * Solo se recalcula cuando cambia cartProducts
     */
    const cartItemsCount = useMemo(() => getCartItemsCount(), [cartProducts])

    useEffect(() => {
        getAllCategories(allCategories)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/ecommerceavion/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setShowSearch(false)
            setSearchQuery('')
        }
    }

    return (
    <nav className='fixed top-0 w-full flex flex-col bg-BorderGrey z-50'>
        <section className='flex justify-between h-[66px] p-4 items-center'>
            <div className='flex items-center w-[60px]'>
                {showSearch ? (
                    <form onSubmit={handleSearch} className='flex items-center w-full'>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search...'
                            className='w-full h-8 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-Primary'
                            autoFocus
                        />
                        <button type='submit' className='ml-1' aria-label='Search products'>
                            <FaSearch size={18} />
                        </button>
                    </form>
                ) : (
                    <button onClick={() => setShowSearch(true)} className='flex items-center justify-center w-full h-full' aria-label='Open search'>
                        <FaSearch color='black' size={24} />
                    </button>
                )}
            </div>
            <NavLink to='/ecommerceavion/' className='flex items-center w-44'>
                <img src={logo} alt="Logo" width={50} height={50}/>
                <p className='px-2 font-Roboto text-Headline_one text-Dark'>Avion</p>
                <img src={logo} alt="Logo" width={50} height={50}/>
            </NavLink>
            <ul className='flex justify-around text-botton font-Roboto'>
                <li className='pr-6 flex items-center relative'>
                    <NavLink to='/ecommerceavion/shopping' className='pl-2' aria-label='Shopping cart'>
                        <IoCartOutline size={24} />
                    </NavLink>
                    {cartItemsCount > 0 && (
                        <span className='absolute -top-2 -right-2 bg-Dark text-Light text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                            {cartItemsCount}
                        </span>
                    )}
                </li>
                <li className='pr-6 flex items-center' aria-label='User profile'>                    
                    <CgProfile size={24} />
                </li>
            </ul>
            <div onClick={() => {
                openMenu === 'hidden' ? setOpenMenu('flex') : setOpenMenu('hidden')
            }} className='lg:hidden flex items-center' role='button' aria-label='Open menu' aria-expanded={openMenu === 'flex'}>
                <IoMdMenu size={50} />
            </div>
        </section>
        <section className='hidden lg:flex justify-center h-[66px]'>
            <ul className='md:flex md:items-center md:text-Dark sm:hidden font-Open_Sans text-Headline_four'>
                <li>
                    <NavLink to='/ecommerceavion/all_products'>All Products</NavLink>
                </li>
                {
                    dataCategories?.slice(0, 5).map(category => {
                        const key = category?.slug || category?.id || category
                        const label = category?.name || category
                        const categoryUrl = category?.url
                        return (
                            <li className='p-4 font-Open_Sans text-Headline_four' key={key}>
                                <NavLink to={`/ecommerceavion/products/${category.slug}`} onClick={() => {
                                    getProductsCategory(categoryUrl)
                                }}>{label}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
        <section className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === 'flex' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <MobileMenu />
        </section>
    </nav>
  )
}

export default NavBar