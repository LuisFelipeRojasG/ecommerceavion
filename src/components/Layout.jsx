
import { Outlet } from 'react-router'
import useAvionContext from '../context/UseContext'
import NavBar from './NavBar'
import Footer from './Footer'
import Toast from './Toast'

function Layout() {

  const { toast, hideToast } = useAvionContext()

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div id='layout' className='w-full flex-1 mt-16 md:mt-32'>
        <Outlet />
      </div>
      <Footer />
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
