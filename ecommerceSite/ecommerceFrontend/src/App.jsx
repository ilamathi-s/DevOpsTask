import Home from './home/home.jsx'
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Productlist from './home/Productlist.jsx';
import CatBasedPro from './home/catBasedPro.jsx';
import SearchResult from './home/searchResult.jsx';
function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Productlist/>}/>
          <Route path="/category/:categoryId" element={<CatBasedPro />} />
           <Route path="/searchCategory/:categoryName" element={<SearchResult type="category" />} />
            <Route path="/searchProduct/:productName" element={<SearchResult type="product" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
