import '../styles/MovieGrid.css';
import MovieCard from './MovieCard';

export default function MovieGrid({ category, movies, currentPage, totalPages, onPageChange, searchQuery, onSelectMovie }) {
  const hasResults = movies.length > 0;
  const shouldShowPagination = totalPages > 1;

  const renderPaginationItems = () => {
    const items = [];
    const total = totalPages;
    const blockSize = 10;

    if (total <= 1) return items;

    const totalBlocks = Math.ceil(total / blockSize);
    const currentBlock = Math.floor((currentPage - 1) / blockSize);

    items.push({ type: 'page', value: 1 });

    if (currentBlock > 0) {
      const target = Math.max(1, currentBlock * blockSize);
      items.push({ type: 'ellipsis', target });
    }

    const start = currentBlock * blockSize + 1;
    const end = Math.min(total, (currentBlock + 1) * blockSize);
    for (let i = start; i <= end; i++) {
      if (i === 1) continue;
      items.push({ type: 'page', value: i });
    }

    if (currentBlock < totalBlocks - 1) {
      const target = Math.min(total, (currentBlock + 1) * blockSize + 1);
      items.push({ type: 'ellipsis', target });
    }

    if (!items.find((it) => it.type === 'page' && it.value === total)) {
      items.push({ type: 'page', value: total });
    }

    return items;
  };

  return (
    <div className="movie-grid-container">
      <div className="category-title">{category}</div>

      {!hasResults ? (
        <div className="no-results">
          {searchQuery ? `No movies found for "${searchQuery}"` : 'No movies available'}
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <button
              key={`${movie.title}-${index}`}
              type="button"
              className="movie-card-button"
              onClick={() => onSelectMovie?.(movie)}
            >
              <MovieCard movie={movie} />
            </button>
          ))}
        </div>
      )}

      {hasResults && shouldShowPagination && (
        <div className="pagination">
          <button
            type="button"
            className="page-btn prev-btn"
            disabled={currentPage === 1}
            onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
            aria-label="Previous page"
          >
            « Prev
          </button>

          {renderPaginationItems().map((item, idx) => {
            if (item.type === 'ellipsis') {
              return (
                <button
                  key={`e-${idx}`}
                  type="button"
                  className="page-ellipsis page-btn"
                  onClick={() => onPageChange(item.target)}
                  aria-label={`Jump to page ${item.target}`}
                >
                  ...
                </button>
              );
            }

            return (
              <button
                key={`p-${item.value}`}
                type="button"
                className={`page-btn ${currentPage === item.value ? 'active' : ''}`}
                onClick={() => onPageChange(item.value)}
                aria-current={currentPage === item.value ? 'page' : undefined}
              >
                {item.value}
              </button>
            );
          })}

          <button
            type="button"
            className="page-btn next-btn"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange((prev) => Math.min(totalPages, prev + 1))}
            aria-label="Next page"
          >
            Next »
          </button>
        </div>
      )}
    </div>
  );
}
