import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
