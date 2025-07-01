import { useEffect, useState } from "react";
import "./index.css";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResult from "./components/Navbar/NavSearchResult";
import Nav from "./components/Navbar/Nav";
import Main from "./components/Main";
import useLocalStorage from "./hooks/useLocalStorage";

const api_key = "53bc57827eea68547de5bc7f75ca86e7";

function App() {
  const [query, setQuery] = useState("mother");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  function handleSelectMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnSelectMovie() {
    setSelectedMovie(null);
  }

  function handleAddToList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnSelectMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
  }
  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;
      async function getMovies(page) {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
            { signal: signal }
          );

          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu.");
          }
          const data = await res.json();

          if (data.total_results === 0) {
            throw new Error("Film bulunamadı.");
          }
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Aborted");
          } else {
            setError(err.message);
          }
        }
        setLoading(false);
      }
      //First Render (Mount)

      if (query.length < 4) {
        setMovies([]);
        setError("");
        return;
      }
      getMovies(currentPage);

      return () => {
        controller.abort();
      };
    },
    [query, currentPage]
  );

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResult movies={movies} totalResults={totalResults} />
      </Nav>
      <Main
        error={error}
        movies={movies}
        loading={loading}
        onSelectMovie={handleSelectMovie}
        selectedMovie={selectedMovie}
        handleUnSelectMovie={handleUnSelectMovie}
        api_key={api_key}
        onAddToList={handleAddToList}
        selectedMovies={selectedMovies}
        onDeleteFromList={handleDeleteFromList}
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default App;
