import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import StarRating from "../StarRating";

export default function MovieDetails({
  selectedMovie,
  handleUnSelectMovie,
  api_key,
  onAddToList,
  selectedMovies,
}) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");

  const isAddedToList = selectedMovies.map((m) => m.id).includes(selectedMovie);

  const selectedMovieUserRating = selectedMovies.find(
    (m) => m.id === selectedMovie
  )?.userRating;

  function handleAddToList() {
    const newMovie = {
      ...movie,
      userRating,
    };
    onAddToList(newMovie);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${api_key}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setLoading(false);
      }

      getMovieDetails();
    },
    [selectedMovie]
  );
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-2 mb-3">
          <div className="row">
            <div className="col-4 ">
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
              <h6>{movie.title}</h6>
              <p>
                <i className="bi bi-calendar2-date me-1"></i>
                <span>{movie.release_date}</span>
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </p>
            </div>
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.overview}</p>
              <p>
                {/* # "genres?.map" genres listesi boş ise map metodunu çağırmaz */}
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge text-bg-primary me-1">
                    {genre.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <p className="alert alert-primary">{selectedMovie}</p>

          {!isAddedToList ? (
            <>
              <div className="my-4">
                <StarRating onRating={setUserRating} />
              </div>
              <button
                className="btn btn-success me-2"
                onClick={() => handleAddToList(movie)}
              >
                Listeye ekle
              </button>
            </>
          ) : (
            <p>
              Film zaten listeye eklenmiş, film Değerlendirme:{" "}
              <i className="bi bi-stars text-warning me-1"></i>
              {selectedMovieUserRating}
            </p>
          )}

          <button
            className="btn btn-outline-danger"
            onClick={handleUnSelectMovie}
          >
            Seçimi kaldır
          </button>
        </div>
      )}
    </>
  );
}
