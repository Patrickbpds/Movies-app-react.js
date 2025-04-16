import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gradient-to-r from-[#080a3d] to-[#241940]">
      <h1 className="text-2xl font-bold text-white mb-4">My Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p className="text-white">You have not added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="p-4 rounded-xl shadow-lg bg-gradient-to-r from-[#080a3d] to-[#241940]"
            >
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
                onClick={() => removeFavorite(movie.id)}
                className="w-full flex items-center justify-center mt-2 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
