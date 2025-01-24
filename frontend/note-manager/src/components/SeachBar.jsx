import React, { forwardRef } from 'react';

const SearchBar = forwardRef(({ search, setSearch, onFocus }, ref) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search by title or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={onFocus}
        ref={ref}
        className="w-full max-w-lg px-4 py-2 border-none rounded-lg bg-teal-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-mustard-400"
      />
    </div>
  );
});

export default SearchBar;