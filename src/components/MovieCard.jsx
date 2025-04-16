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
    <div className="p-4 rounded-xl shadow-lg bg-gradient-to-r from-[#080a3d] to-[#241940]">
      <h2 className="font-bold text-xl text-white mb-3 truncate text-center">
        {movie.title}
      </h2>
      <div className="w-full flex justify-center mb-3">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-md"
        />
      </div>
      <button
        onClick={toggleFavorite}
        className={`w-full flex items-center justify-center mt-2 px-3 py-1 rounded text-white transition ${
          isFavorite(movie.id)
            ? "bg-yellow-400 hover:bg-yellow-600"
            : "bg-yellow-800 hover:bg-yellow-500"
        }`}
      >
        {isFavorite(movie.id) ? "★" : "☆"}
      </button>
    </div>
  );
};

export default MovieCard;
