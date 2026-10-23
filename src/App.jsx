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

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

function App() {

  return (
    <AvionProvider>
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="shopping" element={<Shopping />} />
            <Route path="all_products" element={<All />} />
            <Route path="products/:category" element={<Products />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="detail" element={<Navigate to="/" replace />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AvionProvider>
  )
}

export default App
