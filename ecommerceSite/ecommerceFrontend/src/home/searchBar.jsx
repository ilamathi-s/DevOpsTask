import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchBar({ searchType }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    if (searchType === "product") {
      navigate(`/searchProduct/${searchTerm}`);
    } else if (searchType === "category") {
      navigate(`/searchCategory/${searchTerm}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="d-flex ms-auto">
      <input
        className="form-control form-control-sm me-2"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-sm btn-outline-info" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
