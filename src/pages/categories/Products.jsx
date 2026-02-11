import useAvionContext from '../../context/UseContext'
import ProductCard from '../../components/ProductCard'

function Products() {

  const { dataProductsCategory } = useAvionContext()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center p-20' > 
      {
        dataProductsCategory?.map(product => (
          
          <ProductCard 
            key={product.id} 
            data={product}
          />
          
        ))
      }
    </div>
  )
}

export default Products