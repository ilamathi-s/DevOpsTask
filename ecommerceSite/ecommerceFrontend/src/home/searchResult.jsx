import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "./searchBar";
import { useNavigate } from "react-router-dom";
function SearchResult({ type }) {
  const navigate=useNavigate();
  const params = useParams();
  const keyword = type === "product" ? params.productName : params.categoryName;
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  useEffect(() => {
    fetch(`http://localhost:5001/${type === "product" ? "searchProduct" : "searchCategory"}/${keyword}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.data || [])
        setTotalPages(data.totalPages || 1);
  })
      .catch(err => console.error(err));
  }, [keyword, type]);
    const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="d-flex ms-auto">
            <SearchBar searchType="category" />
            <button className="btn btn-sm btn-outline-info" type="button" onClick={() => navigate("/products")}>
              All Products
            </button>
          </div>
        </div>
      </nav>
    <div className="container mt-4">
      <div className="row">
          {results.map(item => (
            <div key={type === "product" ? item.productId : item.categoryId} className="col-md-4 mb-3">
              <div className="card mb-3" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{type === "product" ? item.productName : item.categoryName}</h5>
                  <p className="card-text">{type === "product" ? item.productDes : item.categoryDes}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {totalPages > 1 && (
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, idx) => (
                <li key={idx + 1} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePage(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
    </div>
    </>
  );
}

export default SearchResult;
