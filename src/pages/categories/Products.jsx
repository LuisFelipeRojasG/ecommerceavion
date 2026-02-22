import useAvionContext from '../../context/UseContext'
import ProductCard from '../../components/ProductCard'
import FilterButton from '../../components/filters/FilterButton';
import ShortingButton from '../../components/filters/ShortingButton';

function Products() {

  const { dataProductsCategory } = useAvionContext()

  return (
    <div className='grid xl:grid-cols-4'>
      <aside className='xl:hidden w-screen flex justify-center gap-4 p-4'>
        <FilterButton />
        <ShortingButton />
      </aside>
      <section className='col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-20'>
        {
          dataProductsCategory?.map(product => (
            
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

export default Products