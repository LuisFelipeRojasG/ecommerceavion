import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import ProductCard from '../components/ProductCard'
import useAvionContext from '../context/UseContext'
import { allProductos } from '../api/indexApi'

function Listings() {
  const navigate = useNavigate();
  const { dataProducts, getAllProducts } = useAvionContext();


  useEffect(() => {
    getAllProducts(allProductos)
      
  }, [])

  return (
    <section className='col-start-1 col-end-5 md:col-end-13 text-center pb-24'>
        <h1 className='mb-14 text-Headline_two text-Dark'>You might also like</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center p-10 lg:px-6'>
          {
            dataProducts?.slice(0, 4).map(product => (
              <ProductCard 
                key={product.id} 
                data={product}
              />
            ))
          }
        </div>
        <button 
          className='w-full py-4 bg-BorderGrey text-Headline_two text-Dark'
          onClick={() => navigate('/all')}
        >
          View all products collection
        </button>
    </section>
  )
}

export default Listings