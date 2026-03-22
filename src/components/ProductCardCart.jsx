
import useAvionContext from '../context/UseContext'
import { FaTrash } from 'react-icons/fa'

function ProductCardCart({ data }) {

    const { updateCartItemQuantity, removeFromCart } = useAvionContext()

    const handleIncrement = () => {
        updateCartItemQuantity(data.id, data.quantity + 1)
    }

    const handleDecrement = () => {
        if (data.quantity > 1) {
            updateCartItemQuantity(data.id, data.quantity - 1)
        }
    }

    const handleRemove = () => {
        removeFromCart(data.id)
    }

  return (
    <article className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 border border-Gray p-4">
      <figure className='md:col-span-1'>
          <img className='w-full h-40 object-cover' src={data.images[0]} alt={data.title} />
      </figure>
      <div className='md:col-span-2 flex flex-col gap-2'>
          <div className='flex justify-between items-start'>
              <h3 className="font-Roboto pb-2 text-Body_medium">{data.title}</h3>
              <button 
                  onClick={handleRemove}
                  className='text-red-500 hover:text-red-700 p-2'
                  aria-label='Remove item'
              >
                  <FaTrash size={18} />
              </button>
          </div>
          <h4 className="line-clamp-2 font-Open_Sans text-Body_small text-Gray">{data.description}</h4>
          <div className='flex flex-wrap justify-between items-center gap-4 pt-2'>
              <div className='flex items-center gap-2'>
                  <span className="font-Open_Sans text-Body_medium">Quantity:</span>
                  <div className='flex items-center border border-Gray'>
                      <button 
                          onClick={handleDecrement}
                          className='px-3 py-1 hover:bg-LightGrey transition-colors'
                          disabled={data.quantity <= 1}
                      >
                          -
                      </button>
                      <span className='px-4 font-Open_Sans text-Body_medium'>{data.quantity}</span>
                      <button 
                          onClick={handleIncrement}
                          className='px-3 py-1 hover:bg-LightGrey transition-colors'
                      >
                          +
                      </button>
                  </div>
              </div>
              <div className='flex items-center gap-4'>
                  <span className="font-Open_Sans text-Body_medium">Unit: ${data.price}</span>
                  <span className="font-Roboto text-Headline_four font-bold">Total: ${data.total.toFixed(2)}</span>
              </div>
          </div>
      </div>
    </article>
  );
}

export default ProductCardCart
