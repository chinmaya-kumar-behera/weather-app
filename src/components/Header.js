import React, { useState } from "react";

const Header = ({ onSearch, setSearchTerm, searchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 h-24 lg:h-16 bg-gray-500 bg-opacity-40 backdrop-blur-sm py-2">
      <div className="h-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-3 lg:px-0 z-20 ">
        <div>
          <strong className="text-xl">Weather App</strong>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter City"
            className="px-3 py-2 text-gray-700 rounded-lg outline-none border-none"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
