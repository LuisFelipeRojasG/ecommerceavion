import { BrowserRouter, Routes, Route } from 'react-router'
import { AvionProvider } from './context/AvionContext.jsx'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import Shopping from './pages/Shopping.jsx'
import Products from './pages/categories/Products.jsx'
import All from './pages/categories/All.jsx'
import Detail from './pages/Detail.jsx'
import SearchResults from './pages/SearchResults.jsx'


function App() {

  return (
    <AvionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/ecommerceavion/" element={<Home />} />
            <Route path="/ecommerceavion/shopping" element={<Shopping />} />
            <Route path="/ecommerceavion/all_products" element={<All />} />
            <Route path="/ecommerceavion/products/:category" element={<Products />} /> 
            <Route path="/ecommerceavion/detail" element={<Detail />} />
            <Route path="/ecommerceavion/search" element={<SearchResults />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AvionProvider>
  )
}

export default App
