import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>You have not added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.id} className="border p-2 rounded shadow">
              <h2 className="font-medium">{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
