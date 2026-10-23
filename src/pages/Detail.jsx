import { useEffect } from 'react'
import { useParams } from 'react-router'
import FeatureTop from '../components/FeatureTop'
import Listings from '../components/Listings'
import EmailSignUp from '../components/EmailSignUp'
import ProductDetail from '../components/ProductDetail'
import ErrorMessage from '../components/ErrorMessage'
import useAvionContext from '../context/UseContext'
import { productById } from '../api/indexApi'

function Detail() {

  const { id } = useParams()
  const {
    productDetail,
    getProductById,
    isLoadingDetail,
    detailError
  } = useAvionContext()

  // Si se entra directamente o se recarga la página, obtiene el producto por ID
  useEffect(() => {
    if (!id) return
    if (String(productDetail?.id) !== String(id)) {
      getProductById(productById(id))
    }
  }, [id, productDetail?.id, getProductById])

  if (detailError) {
    return (
      <ErrorMessage
        message={detailError}
        onRetry={() => getProductById(productById(id))}
      />
    )
  }

  if (isLoadingDetail || !productDetail) {
    return (
      <div className='flex justify-center items-center py-20'>
        <p className='text-Headline_four font-Open_Sans text-Dark'>Loading product...</p>
      </div>
    )
  }

  return (
    <div>
      <div className='grid grid-cols-4 md:grid-cols-12 px-6 mt-5'>
        <ProductDetail />
        <Listings />
        <FeatureTop />
      </div>
      <EmailSignUp />
    </div>
    
  )
}

export default Detail
