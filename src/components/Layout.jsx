
import { Outlet } from 'react-router'
import { createPortal } from 'react-dom'
import useAvionContext from '../context/UseContext'
import ProductDetail from './ProductDetail'
import NavBar from './NavBar'
import Footer from './Footer'
import Toast from './Toast'

function Layout() {

  const { isProductDetailOpen, toast, hideToast } = useAvionContext()

  return (
    <div className='flex flex-col'>
      <NavBar />
      <div id='layout' className='w-full mt-[66px] md:mt-[66px]'>
        <Outlet />
      </div>
      <Footer />
      {isProductDetailOpen && createPortal(
        <ProductDetail />, document.getElementById('layout')
      )}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </div>
  )
}

export default Layout