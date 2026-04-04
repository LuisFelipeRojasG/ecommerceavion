function FeatureCard({ icon, title, description }) {
  return (
    <div className="h-60 mx-4 p-6 justify-center text-botton bg-BorderGrey">
      {icon}
      <h3 className="my-4 text-Headline_three text-Primary">{title}</h3>
      <p className="my-4 text-Headline_four text-Primary">{description}</p>
    </div>
  )
}

export default FeatureCard