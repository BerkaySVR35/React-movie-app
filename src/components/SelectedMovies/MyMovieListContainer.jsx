import React from "react";
import { useState } from "react";
import MyListSummary from "./MyListSummary";

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value / array.length, 0);
//console.log(getAverage(selected_movie_list.map((a) => a.rating)));

export default function MyMovieListContainer({
  selectedMovies,
  onDeleteFromList,
}) {
  // const [selected_Movies, setSelectedMovies] = useState([]);
  const getAvg = getAverage(selectedMovies.map((a) => a.vote_average));
  const getUserRating = getAverage(selectedMovies.map((b) => b.userRating));
  const getDuration = getAverage(selectedMovies.map((b) => b.runtime));
  return (
    <div className="movie-list sticky-top">
      <div className="card mb-2">
        <div className="card-body">
          <h5>Listem [{selectedMovies.length}] adet film bulunmaktadır.</h5>
          <div className="d-flex justify-content-between">
            <p>
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span>{getAvg.toFixed(2)}</span>
            </p>
            <p>
              <i className="bi bi-stars text-warning me-1"></i>
              <span>{getUserRating.toFixed(2)}</span>
            </p>
            <p>
              <i className="bi bi-hourglass-split text-warning me-1"></i>
              <span>{getDuration.toFixed(0)} dk.</span>
            </p>
          </div>
        </div>
      </div>
      {selectedMovies.map((movie) => (
        <MyListSummary
          movie={movie}
          key={movie.id}
          onDeleteFromList={onDeleteFromList}
        />
      ))}
    </div>
  );
}
