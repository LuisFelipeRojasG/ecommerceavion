import useAvionContext from '../context/UseContext'
import ProductCardCart from './ProductCardCart'

function ProductCart( ) {

    const { cartProducts, getCartTotal } = useAvionContext();

    const subtotal = getCartTotal()

  return (
    <section className='flex flex-col gap-6 px-6 pb-32'>
        <h1 className='text-Headline_three font-Roboto'>
            Your shopping cart
        </h1>
        <div>
            {cartProducts.length === 0 
                ? <p>Your cart is empty</p> 
                : cartProducts.map(product => (
                    <ProductCardCart key={product.id} data={product} />
                ))
            }
            
        </div>
        <div className='flex justify-end items-center gap-6'>
            <h2 className='font-Open_Sans text-Headline_four'>Subtotal</h2>
            <span className='font-Roboto text-Headline_three'>${subtotal.toFixed(2)}</span>
        </div>
        <p className='flex justify-end font-Open_Sans text-Headline_six'>Taxes and shipping are calculated at checkout</p>
        <button className='w-full bg-Dark text-Light py-4'>Go to checkout</button>
    </section>
  );
}

export default ProductCart
