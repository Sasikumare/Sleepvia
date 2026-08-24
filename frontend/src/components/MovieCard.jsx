import '../styles/MovieCard.css';

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
}
