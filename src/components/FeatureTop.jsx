import { FaRecycle, FaCheck } from 'react-icons/fa'
import { GrDeliver } from "react-icons/gr"
import { MdOutlinePayment } from "react-icons/md"

function FeatureTop() {
  return (
    <section className='col-start-1 col-end-5 md:col-end-13'>
      <div className='grid grid-cols-4 grid-rows-5 gap-y-9 lg:grid-cols-12 lg:grid-rows-3 font-Roboto items-center mb-20'>
        <h2 className='row-start-1 col-span-4 lg:col-span-12 lg:col-start-4 lg:col-end-10 text-center text-Headline_two text-Dark'>What makes our brand different</h2>
        <div className='row-start-2 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-3 h-60 mx-4 p-6 justify-center lg:row-start-2 text-botton bg-BorderGrey'>
          <GrDeliver size={30} aria-hidden='true'/>
          <h3 className='my-4 text-Headline_three text-Primary'>Next day as standard</h3>
          <p className='my-4 text-Headline_four text-Primary'>Order before 3pm and get your order
            the next day as standard</p>
        </div>
        <div className='row-start-3 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-7 h-60 mx-4 p-6 justify-center lg:row-start-2 text-botton bg-BorderGrey'>
          <MdOutlinePayment size={30} aria-hidden='true' />
          <h3 className='my-4 text-Headline_three text-Primary'>Unbeatable prices</h3>
          <p className='my-4 text-Headline_four text-Primary'>You won&apos;t find better prices anywhere</p>
        </div>
        <div className='row-start-4 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-3 h-60 mx-4 p-6 justify-center lg:row-start-3 text-botton bg-BorderGrey'>
          <FaCheck size={30} aria-hidden='true' />
          <h3 className='my-4 text-Headline_three text-Primary'>High Quality</h3>
          <p className='my-4 text-Headline_four text-Primary'>Our big variety of products</p>
        </div>
        <div className='row-start-5 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-7 h-60 mx-4 p-6 justify-center lg:row-start-3 text-botton bg-BorderGrey'>
          <FaRecycle size={30} aria-hidden='true'/>
          <h3 className='my-4 text-Headline_three text-Primary'>Recycled packaging</h3>
          <p className='my-4 text-Headline_four text-Primary'>We use 100% recycled packaging to ensure our footprint is manageable</p>
        </div>
        <div className='row-start-3 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-7 h-60 mx-4 p-6 justify-center lg:row-start-2 text-botton bg-BorderGrey'>
          <MdOutlinePayment size={30} />
          <h3 className='my-4 text-Headline_three text-Primary'>Unbeatable prices</h3>
          <p className='my-4 text-Headline_four text-Primary'>You won’t find better prices anywhere</p>
        </div>
        <div className='row-start-4 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-3 h-60 mx-4 p-6 justify-center lg:row-start-3 text-botton bg-BorderGrey'>
          <FaCheck size={30} />
          <h3 className='my-4 text-Headline_three text-Primary'>High Quality</h3>
          <p className='my-4 text-Headline_four text-Primary'>Our big variety of products</p>
        </div>
        <div className='row-start-5 col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-7 h-60 mx-4 p-6 justify-center lg:row-start-3 text-botton bg-BorderGrey'>
          <FaRecycle size={30}/>
          <h3 className='my-4 text-Headline_three text-Primary'>Recycled packaging</h3>
          <p className='my-4 text-Headline_four text-Primary'>We use 100% recycled packaging to ensure our footprint is manageable</p>
        </div>
      </div>
    </section>
  )
}

export default FeatureTop