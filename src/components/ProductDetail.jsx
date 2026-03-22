
import useAvionContext from '../context/UseContext'
import { useState } from 'react'

function ProductDetail() {
    
    const { setIsProductDetailOpen, productDetail, addToCart } = useAvionContext()

    const [quantity, setQuantity] = useState(1)

    const onChangeQuantity = (e) => {
        const value = parseInt(e.target.value)
        setQuantity(value > 0 ? value : 1)
    }

    const handleAddToCart = (e) => {
        e.preventDefault()
        addToCart(productDetail, quantity)
        setIsProductDetailOpen(false)        
    }

  
    return (
        <div className='col-start-1 col-end-5 md:col-end-13 md:flex lg:w-[900px] xl:col-start-3 2xl:col-start-4 pb-20'>
            <figure className='min-w-[300px] min-h-[300px] mr-10'>
                <img className='md:w-auto md:h-[600px] mt-auto' src={productDetail.images[0]} alt={productDetail.title} />
            </figure>
            <div className='grid grid-rows-5 auto-rows-auto h-auto gap-4 p-4'>
                <h2 className='row-start-1 h-auto text-Headline_one font-Roboto text-Dark'>{productDetail.title}</h2>
                <p className='row-start-2 text-Headline_three font-Roboto'>$ {productDetail.price}</p>
                <div className='row-start-3 row-span-2'>
                    <h3 className='pb-8 text-Body_medium font-Roboto'>Product Description</h3>
                    <span className='text-Body_small font-Roboto'>
                        {productDetail.description}
                    </span>
                </div>
                <form className='row-start-5 flex justify-between items-center gap-2'>
                    <div className='flex justify-between items-center gap-2'>
                        <h3 className='pr-8 text-Body_small font-Roboto'>Quantity</h3>
                        <input 
                            id='quantity' 
                            type='number' 
                            min='1'
                            value={quantity}
                            onChange={onChangeQuantity} 
                            className='w-14 h-12 border-8 text-center'
                        />
                    </div>
                    <button onClick={handleAddToCart} className='w-36 h-16 bg-Primary text-Light font-Roboto text-Headline_five'> 
                        Add to cart
                    </button>
                </form>
            </div>
        </div>
    )
    
}

export default ProductDetail;
