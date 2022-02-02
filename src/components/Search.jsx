const Search = ({ handleSearch, searchInput }) => {
  return (
    <div className="Search">
      <p>Search</p>
      <input type="text" onChange={handleSearch} ref={searchInput} />
    </div>
  );
};

export default Search;
