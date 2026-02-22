
import ProductCard from '../../components/ProductCard'
import useAvionContext from '../../context/UseContext'
import FilterButton from '../../components/filters/FilterButton';
import ShortingButton from '../../components/filters/ShortingButton';

function All() {

  const { dataProducts } = useAvionContext()

  return (
    <div className='grid xl:grid-cols-4'>
      <aside className='xl:hidden w-screen flex justify-center gap-4 p-4'>
        <FilterButton />
        <ShortingButton />
      </aside>
      <aside className='hidden xl:block lg:col-span-1'>
        <h2 className='text-Headline_two font-Roboto mb-4'>Categories</h2>
        <ul className='text-Body_medium font-Open_Sans text-Dark'>
          <li className='mb-2'>All Products</li>
          <li className='mb-2'>Clothing</li>
          <li className='mb-2'>Accessories</li>
          <li className='mb-2'>Home & Living</li>
          <li className='mb-2'>Art & Collectibles</li>
        </ul>
      </aside>
      <section className='col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-20'>
        {
          dataProducts?.map(product => (
            <ProductCard 
              key={product.id} 
              data={product}
            />
          ))
        }
      </section>
    </div>
  )
}

export default All