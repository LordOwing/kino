import { useState, useMemo } from "react";
import { movies } from "../data/movies";
import { MovieCard } from "../components/MovieCard";
import { MovieFilter } from "../components/MovieFilter";

export const RepertoirePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const genres = useMemo(() => {
    const list = movies.map((m) => m.genre);
    return ["all", ...Array.from(new Set(list))];
  }, []);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((m) => m.title.toLowerCase().includes(q));
    }

    if (selectedGenre !== "all") {
      result = result.filter((m) => m.genre === selectedGenre);
    }

    if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title, "pl"));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title, "pl"));
    } else if (sortBy === "duration-asc") {
      result.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "duration-desc") {
      result.sort((a, b) => b.duration - a.duration);
    }

    return result;
  }, [searchQuery, selectedGenre, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSortBy("default");
  };

  return (
    <div className="container pb-5">
      <div className="py-4 text-center">
        <h1 className="fw-bold">Repertuar Kina</h1>
        <p className="text-muted">Przeglądaj aktualne filmy i wybierz seans</p>
      </div>

      <MovieFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        sortBy={sortBy}
        onSortChange={setSortBy}
        genres={genres}
        onResetFilters={handleResetFilters}
      />

      {filteredMovies.length > 0 ? (
        <div className="row">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">
          Nie znaleziono żadnego filmu dla wybranych filtrów.
        </div>
      )}
    </div>
  );
};
