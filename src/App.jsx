import { useEffect, useState } from "react";
import Search from "/src/components/search.jsx";
import Spinner from "/src/components/Spinner.jsx";
import MovieCard from "/src/components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "/src/appwrite.js";
import FavoritesPage from "./pages/FavoritesPage";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.status_message || "Failed to fetch movies");
      }

      const data = await response.json();

      if (data.results && data.results.length === 0) {
        setMovieList([]);
        setErrorMessage(
          query ? `No movies found for "${query}"` : "No movies available"
        );
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <nav className="mt-6 mb-4 flex gap-4 justify-center">
          <button
            onClick={() => setShowFavorites(false)}
            className={`px-5 py-2.5 rounded-2xl font-bold shadow-md transition-all duration-200
      ${
        !showFavorites
          ? "bg-gradient-to-r from-[#080a3d] to-[#241940] text-white"
          : "bg-[#ebe7ff] text-[#3a3b8d] hover:bg-[#d8d4f0]"
      } focus:outline-none focus:ring-2 focus:ring-indigo-300`}
          >
            Home
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className={`px-5 py-2.5 rounded-2xl font-bold shadow-md transition-all duration-200
      ${
        showFavorites
          ? "bg-gradient-to-r from-[#080a3d] to-[#241940] text-white"
          : "bg-[#ebe7ff] text-[#3a3b8d] hover:bg-[#d8d4f0]"
      } focus:outline-none focus:ring-2 focus:ring-indigo-300`}
          >
            My Favorites
          </button>
        </nav>

        {showFavorites ? (
          <FavoritesPage />
        ) : (
          <>
            {trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="all-movies">
              <h2>All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
