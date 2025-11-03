import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./searchBar";
import "bootstrap/dist/css/bootstrap.css";
function CatBasedPro() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const navigate = useNavigate();
  const fetchProducts = (page) => {
    fetch(`http://localhost:5001/products/${categoryId}?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts(page);
  }, [categoryId, page]);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex ms-auto">
            <SearchBar searchType="product" />
            <button className="btn btn-sm btn-outline-info" type="button" onClick={() => navigate("/products")}>
              All Products
            </button>
          </div>
        </div>
      </nav>
    <div className="container mt-4">
      <div className="row">
        {products.map(product => (
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
      <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => (
              <li key={idx + 1} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPage(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
    </div>
    </>
  );
}

export default CatBasedPro;
