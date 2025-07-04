'use client';

import SearchBar from "./SearchBar";

export default function SearchBarWrapper() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Later you can add live filtering logic here
  };

  return <SearchBar onSearch={handleSearch} />;
}
