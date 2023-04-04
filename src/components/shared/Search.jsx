import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-300" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="pl-8 pr-4 py-1 border rounded w-60 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-300 hover:text-gray-400 focus:outline-none"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
