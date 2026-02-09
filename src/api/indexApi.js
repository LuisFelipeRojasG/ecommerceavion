//const apiUrl = 'https://api.escuelajs.co/api/v1'
const apiUrl = 'https://dummyjson.com'

//consultas a la api

const allProductos = apiUrl + '/products'
const allCategories = apiUrl + '/products/categories'

const allClothes = apiUrl + '/categories/1/products'
const allElectronics = apiUrl + '/categories/2/products'
const allFurniture = apiUrl + '/categories/3/products'
const allShoes = apiUrl + '/categories/4/products'
const allMiscellaneous = apiUrl + '/categories/5/products'


export { allProductos, allCategories, allClothes, allElectronics, allFurniture, allShoes, allMiscellaneous }