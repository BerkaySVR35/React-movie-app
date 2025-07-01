import React from "react";
import MovieListContainer from "./MovieListContainer";
import MyMovieListContainer from "./SelectedMovies/MyMovieListContainer";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMesage";
import MovieDetails from "./Movies/MovieDetails";
import Pagination from "./Pagination";

export default function Main({
  movies,
  loading,
  error,
  onSelectMovie,
  selectedMovie,
  handleUnSelectMovie,
  api_key,
  onAddToList,
  selectedMovies,
  onDeleteFromList,
  nextPage,
  previousPage,
  currentPage,
  totalPages,
}) {
  return (
    <main className="container">
      <div className="row mt-2">
        <div className="col-md-9">
          Movie List
          {/* {loading ? <Loading /> : <MovieListContainer movies={movies} />} */}
          {loading && <Loading />}
          {!loading && !error && (
            <>
              {movies.length > 0 && (
                <>
                  <MovieListContainer
                    movies={movies}
                    onSelectMovie={onSelectMovie}
                  />
                  <Pagination
                    nextPage={nextPage}
                    previousPage={previousPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </>
              )}
            </>
          )}
          {error && <ErrorMessage message={error} />}
        </div>
        <div className="col-md-3">
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              handleUnSelectMovie={handleUnSelectMovie}
              api_key={api_key}
              onAddToList={onAddToList}
              selectedMovies={selectedMovies}
            />
          ) : (
            <MyMovieListContainer
              selectedMovies={selectedMovies}
              onDeleteFromList={onDeleteFromList}
            />
          )}
        </div>
      </div>
    </main>
  );
}
