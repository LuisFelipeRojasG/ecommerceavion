import { useNavigate } from 'react-router'
import useAvionContext from '../context/UseContext'

function ProductCard( {data} ) {

  const { setProductDetail } = useAvionContext()

  let navigate = useNavigate()
  const exportProductDetail = (productData) => {
    setProductDetail(productData)
    navigate('/ecommerceavion/detail')
  }

  return (
    <>
      <article className='flex flex-col gap-4 w-60 p-4 border border-Gray'>
        <figure className='mb-4'>
            <img className='w-60 h-[200px] object-cover' src={data.images[0]} alt={data.title} />
        </figure>
        <div className='flex flex-col justify-between h-full gap-4'>
          <span className='text-Body_large font-Roboto text-Dark mb-2'>{data.title}</span>
          <div className='flex justify-between items-center'>
            <span className='text-Headline_four font-Roboto'>$ {data.price}</span>
            <button onClick={() => exportProductDetail(data)} className='bg-Primary text-Light px-4 py-2 text-Headline_six'>Details</button>
          </div>
        </div>
      </article>
    </>
    
  )
}

export default ProductCard