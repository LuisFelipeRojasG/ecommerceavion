import { FaRecycle, FaCheck } from 'react-icons/fa'
import { GrDeliver } from "react-icons/gr"
import { MdOutlinePayment } from "react-icons/md"
import FeatureCard from './FeatureCard'

function FeatureTop() {
  const features = [
    {
      icon: <GrDeliver size={30} aria-hidden="true" />,
      title: "Next day as standard",
      description: "Order before 3pm and get your order the next day as standard"
    },
    {
      icon: <MdOutlinePayment size={30} aria-hidden="true" />,
      title: "Unbeatable prices",
      description: "You won't find better prices anywhere"
    },
    {
      icon: <FaCheck size={30} aria-hidden="true" />,
      title: "High Quality",
      description: "Our big variety of products"
    },
    {
      icon: <FaRecycle size={30} aria-hidden="true" />,
      title: "Recycled packaging",
      description: "We use 100% recycled packaging to ensure our footprint is manageable"
    }
  ]

  return (
    <section className="col-start-1 col-end-5 md:col-end-13">
      <div className="grid grid-cols-4 grid-rows-5 gap-y-9 lg:grid-cols-12 lg:grid-rows-3 font-Roboto items-center mb-20">
        <h2 className="row-start-1 col-span-2 lg:col-span-12 lg:col-start-4 lg:col-end-10 text-Headline_two text-Dark">
          What makes our brand different
        </h2>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`row-start-${index + 2} col-span-4 lg:col-span-6 xl:col-span-4 ${
              index % 2 === 0 ? 'xl:col-start-3' : 'xl:col-start-7'
            } lg:row-start-2 ${index >= 2 ? 'lg:row-start-3' : ''}`}
          >
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureTop