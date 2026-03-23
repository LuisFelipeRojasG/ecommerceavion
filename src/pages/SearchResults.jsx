import { useEffect, useState } from 'react'
import { useSearchParams, NavLink } from 'react-router'
import ProductCard from '../components/ProductCard'
import { FaArrowLeft } from 'react-icons/fa'

function SearchResults() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const searchProducts = async () => {
            if (!query.trim()) {
                setSearchResults([])
                return
            }

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
                const data = await response.json()
                setSearchResults(data.products || [])
            } catch (err) {
                console.log(err)
                setError('Error fetching search results')
            } finally {
                setLoading(false)
            }
        }

        searchProducts()
    }, [query])

    return (
        <div className='grid grid-cols-1'>
            <div className='w-full'>
                <div className='bg-LightGrey p-4 flex items-center gap-4'>
                    <NavLink to='/ecommerceavion/' className='flex items-center gap-2 text-Headline_four text-Dark hover:text-Primary'>
                        <FaArrowLeft />
                        Back
                    </NavLink>
                </div>
                <div className='p-6'>
                    <h1 className='font-Roboto text-Headline_two text-Dark mb-2'>
                        Search Results
                    </h1>
                    <p className='text-Body_small text-Dark'>
                        {query ? `Showing results for &quot;${query}&quot;` : 'Enter a search term'}
                    </p>
                </div>
            </div>
            
            {loading && (
                <div className='flex justify-center items-center py-20'>
                    <p className='text-Headline_four'>Loading...</p>
                </div>
            )}

            {error && (
                <div className='flex justify-center items-center py-20'>
                    <p className='text-red-500 text-Headline_four'>{error}</p>
                </div>
            )}

            {!loading && !error && searchResults.length === 0 && query && (
                <div className='flex flex-col justify-center items-center py-20'>
                    <p className='text-Headline_four text-Dark'>No products found for &quot;{query}&quot;</p>
                    <NavLink to='/ecommerceavion/all_products' className='mt-4 text-Primary hover:underline'>
                        View all products
                    </NavLink>
                </div>
            )}

            {!loading && !error && searchResults.length > 0 && (
                <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center p-10'>
                    {searchResults.map(product => (
                        <ProductCard
                            key={product.id}
                            data={product}
                        />
                    ))}
                </section>
            )}
        </div>
    )
}

export default SearchResults