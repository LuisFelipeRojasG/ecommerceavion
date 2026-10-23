import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AvionProvider } from './context/AvionContext.jsx'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import Shopping from './pages/Shopping.jsx'
import Products from './pages/categories/Products.jsx'
import All from './pages/categories/All.jsx'
import Detail from './pages/Detail.jsx'
import SearchResults from './pages/SearchResults.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import NotFound from './pages/NotFound.jsx'


function App() {

  return (
    <AvionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/ecommerceavion/" replace />} />
          <Route element={<Layout />} errorElement={<ErrorPage />}>
            <Route path="/ecommerceavion/" element={<Home />} />
            <Route path="/ecommerceavion/shopping" element={<Shopping />} />
            <Route path="/ecommerceavion/all_products" element={<All />} />
            <Route path="/ecommerceavion/products/:category" element={<Products />} />
            <Route path="/ecommerceavion/detail/:id" element={<Detail />} />
            <Route path="/ecommerceavion/detail" element={<Navigate to="/ecommerceavion/" replace />} />
            <Route path="/ecommerceavion/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AvionProvider>
  )
}

export default App
