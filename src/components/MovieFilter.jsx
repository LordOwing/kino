export const MovieFilter = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  genres = [],
  onResetFilters
}) => {
  return (
    <div className="card p-3 mb-4 bg-white shadow-sm">
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <label htmlFor="search" className="form-label small fw-bold">
            Szukaj po tytule:
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Wpisz tytuł filmu..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="genre" className="form-label small fw-bold">
            Gatunek:
          </label>
          <select
            id="genre"
            className="form-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g === "all" ? "Wszystkie gatunki" : g}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="sort" className="form-label small fw-bold">
            Sortowanie:
          </label>
          <select
            id="sort"
            className="form-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="default">Domyślnie</option>
            <option value="title-asc">Tytuł (A - Z)</option>
            <option value="title-desc">Tytuł (Z - A)</option>
            <option value="duration-asc">Czas trwania (rosnąco)</option>
            <option value="duration-desc">Czas trwania (malejąco)</option>
          </select>
        </div>
      </div>

      {(searchQuery || selectedGenre !== "all" || sortBy !== "default") && (
        <div className="mt-3 text-end">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onResetFilters}
          >
            Wyczyść filtry
          </button>
        </div>
      )}
    </div>
  );
};
