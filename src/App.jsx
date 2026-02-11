import { BrowserRouter, Routes, Route } from 'react-router'
import { AvionProvider } from './context/AvionContext.jsx'
import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import Shopping from './pages/Shopping.jsx'
import Products from './pages/categories/Products.jsx'
import All from './pages/categories/All.jsx'
import Detail from './pages/Detail.jsx'


function App() {

  return (
    <AvionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/all_products" element={<All />} />
            <Route path="/products/:category" element={<Products />} /> 
            <Route path="/detail" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AvionProvider>
  )
}

export default App
