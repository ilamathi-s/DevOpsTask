import { useEffect,useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";
function Home() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6; 
    const fetchCategories = (page) => {
    fetch(`http://localhost:5001/categories?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.data || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => console.error("Error fetching categories:", err));
  };
    useEffect(() => {
      fetchCategories(page);
    }, [page]);
    useEffect(() => {
        fetch("http://localhost:5001/categories")
        .then((res) => res.json())
        .then((data) => {
            setCategories(data.data || []); 
        })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);
   const handleCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
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
      {categories.map((category) => (
        <div key={category.categoryId} className="col-md-4 mb-3" onClick={() => handleCategory(category.categoryId)} style={{ cursor: "pointer" }}>
          <div className="card mb-3" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{category.categoryName}</h5>
              <p className="card-text">{category.categoryDes}</p>
            </div>
          </div>
          </div>
      ))}
    </div>
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
  </div>
    </>
  )
  
}

export default Home
