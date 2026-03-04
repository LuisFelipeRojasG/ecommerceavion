
import ProductCard from '../../components/ProductCard'
import useAvionContext from '../../context/UseContext'
import allProducts from '../../assets/pageHeaders.webp'
import AsideOptions from '../../components/filters/AsideOptions'

function All() {

  const { dataProducts } = useAvionContext()

  return (
    <div className='grid grid-cols-1'>
      <div className='w-full'>
        <img src={allProducts} alt="All Products Header" className='w-full h-auto' />
      </div>
      <div className='flex flex-col xl:flex-row gap-6 justify-center'>
        <AsideOptions />
        <section className='grow grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-10'>
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
    </div>
  )
}

export default All