const apiUrl = 'https://dummyjson.com'

//consultas a la api

const allProductos = apiUrl + '/products?limit=0'
const allCategories = apiUrl + '/products/categories'
const productById = (id) => `${apiUrl}/products/${id}`
const productsByCategory = (category) => `${apiUrl}/products/category/${category}`


export { allProductos, allCategories, productById, productsByCategory }
