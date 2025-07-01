import React from "react";

export default function Movie({ movie, onSelectMovie, selectedMovie }) {
  return (
    <div className="col mb-2">
      <div
        className={`card movie ${
          selectedMovie === movie.id ? "selected-movie" : ""
        }`}
        onClick={() => onSelectMovie(movie.id)}
      >
        <img
          src={
            movie.poster_path
              ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                movie.poster_path
              : "/vite.svg"
          }
          alt={movie.title}
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <span>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.release_date}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
