import '../styles/MovieSidebar.css';

export default function MovieSidebar({ recentMovies, onSelectMovie }) {
  return (
    <aside className="movie-sidebar">
      <h2>Recently Added Movies</h2>
      <ul className="recent-movies-list">
        {recentMovies.map((movie, index) => (
          <li key={`${movie.title || 'recent'}-${index}`}>
            <button
              type="button"
              className="movie-link"
              onClick={() => onSelectMovie?.(movie)}
            >
              ▶ {movie.title || movie}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
