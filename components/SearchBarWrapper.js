'use client';

import SearchBar from './SearchBar';

export default function SearchBarWrapper() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // You can add real logic here later (filtering, etc.)
  };

  return <SearchBar onSearch={handleSearch} />;
}
