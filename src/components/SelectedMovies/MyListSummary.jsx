import React from "react";

export default function MyListSummary({ movie, onDeleteFromList }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img
            className="img-fluid"
            src={
              movie.poster_path
                ? `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                  movie.poster_path
                : "/vite.svg"
            }
            alt={movie.title}
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{movie.title}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <p>
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span>{movie.vote_average}</span>
            </p>
            <p>
              <i className="bi bi-hourglass text-danger me-1"></i>
              <span className="me-2">{movie.runtime} dk.</span>
            </p>

            <button
              className="btn btn-danger"
              onClick={() => onDeleteFromList(movie.id)}
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
