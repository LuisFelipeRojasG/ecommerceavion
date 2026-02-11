import imageBlock from '../assets/imageBlock.webp'

function FeatureDown() {
    return (
        <section className='col-start-1 col-end-5 md:col-end-13 flex flex-col lg:flex-row items-center justify-center md:px-10 lg:px-0 gap-4 mb-20'>
            <div className='max-w-[630px] h-[468px] md:w-[650px] md:h-full flex flex-col justify-center p-10 bg-DarkPrimary text-Light'>
                <h3 className='pb-4 text-Headline_two font-Roboto '>It started with a small idea</h3>
                <p className='pb-[150px] text-Body_small font-Open_Sans'>A global brand with local beginnings, our story begain in a small studio in South London in early 2014</p>
                <button className='w-full p-4 bg-Primary'>View collection</button>
            </div>
            <figure className="max-w-[630px] h-[468px] md:w-[650px] md:h-full">
                <img src={imageBlock} alt='Feature' className='w-full h-full object-cover' />
            </figure>
        </section>
    )
}

export default FeatureDown