
import useAvionContext from '../../context/UseContext'
import FilterButton from '../../components/filters/FilterButton'
import ShortingButton from '../../components/filters/ShortingButton'
import CategoryButton from './CategoryButton'

function AsideOptions() {

  const { dataCategories } = useAvionContext()
  const arrayPrice = ["< 10", "20 - 50", "50 - 100", "> 100"]

  return (
    <>
        <div className='grow-0 xl:hidden w-screen h-20 flex justify-center gap-4 mt-10'>
            <FilterButton />
            <ShortingButton />
            <CategoryButton />
        </div>
        <div className='hidden xl:flex flex-col gap-4 w-72 h-auto'>
          <div>
            <h2 className='font-Roboto text-Headline_three pl-6 my-6'>Categories</h2>
            <ul>
                {
                  dataCategories?.map(category => {
                      const key = category?.slug || category?.id || category
                      const label = category?.name || category
                      return (
                          <li className='px-4 mb-4 font-Open_Sans text-Headline_four' key={key}>
                                <input type='checkbox' className='mx-4'/>
                                  {label}
                          </li>
                      )
                  })
                }
            </ul>
          </div>
          <div>
            <h2 className='font-Roboto text-Headline_three pl-6 my-6'>Filter Price</h2>
            <ul>
              {
                arrayPrice.map(price => (
                  <li  key={price} className='p-4 font-Open_Sans text-Headline_four'>
                    <input type='checkbox' className='mx-4'/>
                      $ {price}
                  </li>
                )
              )}
            </ul>
          </div>
          <div></div>
        </div>
    </>
  )
}

export default AsideOptions