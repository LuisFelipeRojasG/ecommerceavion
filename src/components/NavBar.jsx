import { NavLink } from 'react-router'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { IoCartOutline } from 'react-icons/io5'
import { IoMdMenu } from 'react-icons/io'
import useAvionContext from '../context/UseContext'
import MobileMenu from './MobileMenu'
import logo from '../assets/group98.png'
import { useEffect } from 'react'
import { allCategories } from '../api/indexApi'

function NavBar() {

    const { openMenu, setOpenMenu, getAllCategories, dataCategories, getProductsCategory } = useAvionContext()

    useEffect(() => {
        getAllCategories(allCategories)
    }, [])


  return (
    <nav className='fixed top-0 w-full flex flex-col bg-BorderGrey'>
        <section className='flex justify-between h-[66px] p-4'>
            <div className='flex items-center justify-center w-[60px] h-[34px]'>
                <FaSearch color='black' size={24} />
            </div>
            <NavLink to='/' className='flex items-center w-44'>
                <img src={logo} alt="Logo" width={50} height={50}/>
                <p className='px-2 font-Roboto text-Headline_one text-Dark'>Avion</p>
                <img src={logo} alt="Logo" width={50} height={50}/>
            </NavLink>
            <ul className='hidden lg:flex justify-around text-botton font-Roboto'>
                <li className='pr-6 flex items-center'>
                    <NavLink to='/shopping' className='pl-2'>
                        <IoCartOutline size={24} />
                    </NavLink>
                </li>
                <li className='pr-6 flex items-center'>                    
                    <CgProfile size={24} />
                </li>
            </ul>
            <div onClick={() => {
                openMenu === 'hidden' ? setOpenMenu('flex') : setOpenMenu('hidden')
            }} className='lg:hidden flex items-center'>
                <IoMdMenu size={50} />
            </div>
        </section>
        <section className='hidden lg:flex justify-center h-[66px]'>
            <ul className='md:flex md:items-center md:text-Dark sm:hidden font-Open_Sans text-Headline_four'>
                <li>
                    <NavLink to='/all_products'>All Products</NavLink>
                </li>
                {
                    dataCategories?.slice(0, 5).map(category => {
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
        </section>
        <section className={`justify-center h-auto ${openMenu}`}>
            <MobileMenu />
        </section>
    </nav>
  )
}

export default NavBar