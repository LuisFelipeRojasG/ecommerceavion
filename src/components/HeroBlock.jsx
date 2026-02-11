import { FaShoppingBag } from 'react-icons/fa'
import heroBlock from '../assets/heroBlocks.webp'

function HeroBlock() {
  return (
    <section className='col-start-1 col-end-5 grid-rows-4 md:col-span-12 md:grid md:grid-cols-12 pb-4'>
        <div className='md:col-span-6 md:row-span-4 md:col-start-2 grid grid-rows-4'>
            <h1 className='col-span-1 pt-10 md:row-start-2 font-Roboto text-6xl text-Dark'>Collections</h1>
            <p className='row-span-1 md:row-start-3 font-Open_Sans text-Headline_two text-Primary'>You can explore and shop many different collections from famous brands</p>
            <button className='row-span-1 row-start-4 w-40 h-16 p-2 flex items-center justify-center bg-BorderGrey text-Dark text-Headline_five'>
              <FaShoppingBag className='mx-2' size={24} />
              Shop Now
            </button>
        </div>
        <figure className='hidden md:block my-auto md:col-start-9 md:col-span-3 md:row-span-4'>
            <img src={heroBlock} alt="Collections" className=' rounded-tl-[200px] rounded-br-[200px]' />
        </figure>
    </section>
  )
}

export default HeroBlock