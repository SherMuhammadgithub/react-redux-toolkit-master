export const addToFavoritesToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((favorite) => favorite._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
export const removeFromFavoritesFromLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter(
    (favourite) => favourite._id !== product._id
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
