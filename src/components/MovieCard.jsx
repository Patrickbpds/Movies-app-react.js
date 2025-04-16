import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const toggleFavorite = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="font-semibold text-lg mb-2">{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />

      <button
        onClick={toggleFavorite}
        className={`mt-2 px-3 py-1 rounded ${
          isFavorite(movie.id) ? "bg-yellow-300" : "bg-yellow-800/90"
        }`}
      >
        {isFavorite(movie.id) ? "★" : "☆"}
      </button>
    </div>
  );
};

export default MovieCard;
