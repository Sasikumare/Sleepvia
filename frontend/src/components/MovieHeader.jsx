import '../styles/MovieHeader.css';

export default function MovieHeader({ onCategoryChange, onSearch, searchTerm, onSearchTermChange }) {
  const categories = [
    'HOME',
    'TELUGU',
    'TAMIL',
    'MALAYALAM',
    'BOLLYWOOD',
    'HOLLYWOOD',
    'OTHERS',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="movie-header">
      <div className="header-top">
        <div className="logo">
          <h1>Sleepvia {new Date().getFullYear()}</h1>
          <p>Latest Telugu, Tamil, Malayalam , Bollywood & Hollywood Movies</p>
        </div>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => {
              onSearchTermChange(e.target.value);
            }}
          />
        </form>
      </div>

      <nav className="nav-categories">
        {categories.map((category) => (
          <button
            key={category}
            className="nav-item"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  );
}
