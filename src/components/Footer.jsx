import { NavLink } from 'react-router'
import { FaLinkedin, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import useAvionContext from '../context/UseContext'

function Footer() {

    const { dataCategories, getProductsCategory } = useAvionContext()

  return (
    <section className="w-full flex flex-col items-center justify-center bg-DarkPrimary text-Light p-10">
        <div className="flex flex-col lg:flex-row items-center justify-around gap-4 mb-6">
            <div className="flex justify-center gap-4 my-10">
                <div className="mx-4 md:mr-20">
                    <h3 className="pb-2 text-Headline_three">Menu</h3>
                    <p>New arrivals</p>
                    <p>Best sellers</p>
                    <p>Recently viewed</p>
                    <p>Popular this week</p>
                    <p>All products</p>
                </div>
                <div className="mx-4 md:mr-20">
                    <h3 className="pb-2 text-Headline_three">Categories</h3>
                    <ul>
                        <li>
                            <NavLink to='/all_products'>All Products</NavLink>
                        </li>
                        {
                            dataCategories?.slice(0, 6).map(category => {
                                const key = category?.slug || category?.id || category
                                const label = category?.name || category
                                const categoryUrl = category?.url
                                return (
                                    <li key={key}>
                                        <NavLink to={`/products/${category.slug}`} onClick={() => {
                                            getProductsCategory(categoryUrl)
                                        }}>{label}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="mx-4 md:mr-20">
                    <h3 className="pb-2 text-Headline_three">Our company</h3>
                    <p>About us</p>
                    <p>Vacancies</p>
                    <p>Contact us</p>
                    <p>Privacy</p>
                    <p>Returns policy</p>
                </div>
            </div>
            <div>
                <h3 className="text-Headline_three pb-4">
                    Join our mailing list
                </h3>
                <div className="w-96 h-12 flex ">
                    <input type="text" className="w-full bg-BorderDark text-Dark p-4"/>
                    <button type="button" className="w-28 bg-LightGrey text-Dark">Sign up</button>
                </div>
            </div>
        </div>
        <div className="w-full flex items-center justify-center md:justify-between gap-4 border-t-2 border-Light pt-4">
            <div>
                <p>Copyright 2025 Avion LTD</p>
            </div>
            <div className="hidden md:flex items-center justify-center gap-4">
                <FaLinkedin size={30}/>
                <FaFacebookSquare size={30}/>
                <FaInstagram size={30}/>
                <FaSquareXTwitter size={30}/>
            </div>
        </div>
    </section>
  )
}

export default Footer