import HeroBlock from '../components/HeroBlock'
import FeatureTop from '../components/FeatureTop'
import Listings from '../components/Listings'
import FeatureDown from '../components/FeatureDown'
import EmailSignUp from '../components/EmailSignUp'
import ErrorMessage from '../components/ErrorMessage'
import useAvionContext from '../context/UseContext'

function Home() {

  const { error } = useAvionContext()

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <div className='grid grid-cols-4 md:grid-cols-12 px-6 mt-5'>
        <HeroBlock />
        <FeatureTop />
        <Listings />
        <FeatureDown />
      </div>
      <EmailSignUp />
    </div>
    
  )
}

export default Home