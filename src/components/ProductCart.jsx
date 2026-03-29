import { useState } from 'react'
import { NavLink } from 'react-router'
import { FaCheckCircle } from 'react-icons/fa'
import useAvionContext from '../context/UseContext'
import ProductCardCart from './ProductCardCart'

function ProductCart( ) {

    // Estados del contexto: productos del carrito, total y función para limpiar
    const { cartProducts, getCartTotal, clearCart } = useAvionContext();

    // Estado local para controlar si se muestran los mensajes de éxito
    const [showThankYou, setShowThankYou] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const subtotal = getCartTotal()

    /**
     * Maneja el proceso de finalizar compra
     * Al hacer click:
     * 1. Activa el estado de procesamiento (para mostrar feedback visual)
     * 2. Limpia el carrito (elimina todos los productos)
     * 3. Muestra el mensaje de agradecimiento
     */
    const handleCheckout = () => {
        setIsProcessing(true)
        
        // Simula un pequeño delay para dar feedback visual al usuario
        setTimeout(() => {
            clearCart()
            setShowThankYou(true)
            setIsProcessing(false)
        }, 500)
    }

    // Si el usuario ya completó la compra, mostrar mensaje de agradecimiento
    if (showThankYou) {
        return (
            <section className='flex flex-col gap-6 px-6 pb-32 items-center justify-center min-h-[50vh]'>
                <div className='flex flex-col items-center gap-6 text-center'>
                    <FaCheckCircle size={64} className='text-green-500' />
                    <h1 className='text-Headline_one font-Roboto text-Dark'>
                        ¡Gracias por tu compra!
                    </h1>
                    <p className='text-Body_medium font-Open_Sans text-Light'>
                        Tu pedido ha sido procesado exitosamente.
                    </p>
                    <p className='text-Body_small font-Open_Sans text-Light'>
                        Te hemos enviado un correo electrónico con los detalles de tu compra.
                    </p>
                </div>
                <NavLink 
                    to='/ecommerceavion/' 
                    className='mt-8 bg-Primary text-Light px-8 py-3 text-Headline_five rounded hover:bg-Dark transition-colors'
                >
                    Volver a la tienda
                </NavLink>
            </section>
        )
    }

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
        
        {/* Botón de finalizar compra - se muestra solo si hay productos en el carrito */}
        {cartProducts.length > 0 && (
            <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className='w-full bg-Dark text-Light py-4 hover:bg-Primary transition-colors disabled:opacity-50'
            >
                {isProcessing ? 'Processing...' : 'Finalizar compra'}
            </button>
        )}
    </section>
  );
}

export default ProductCart
