import React from "react";
import { useState } from "react";
import MovieList from "./Movies/MovieList";

export default function MovieListContainer({ movies, onSelectMovie }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpen((val) => !val)}
      >
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && <MovieList movies={movies} onSelectMovie={onSelectMovie} />}
    </div>
  );
}
