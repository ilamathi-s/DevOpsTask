import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from 'react';
import SearchBar from './searchBar';
  function Productlist(){
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 9;
     const fetchProducts = (pageNumber) => {
    fetch(`http://localhost:5001/allProducts?page=${pageNumber}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex ms-auto">
            <SearchBar searchType="product" />
            <button className="btn btn-sm btn-outline-info" type="button" onClick={() => setPage(1)}>
              All Products
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
            {products.map((product) => (
                    <div key={product.productId} className="col-md-4 mb-3">
                        <div className="card mb-3" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{product.productName}</h5>
                            <p className="card-text">{product.productDes}</p>
                            <p><strong>MRP:</strong> {product.MRP}</p>
                            <p><strong>Discount:</strong> {product.discount}%</p>
                        </div>
                        </div>
                    </div>
                    ))}
            </div>
            <nav className='d-flex justify-content-center mt-4'>
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => page > 1 && handlePage(page - 1)}>
                    Previous
                  </button>
                </li>
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => page < totalPages && handlePage(page + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
  </div>
    </>
  )
  
}
export default Productlist