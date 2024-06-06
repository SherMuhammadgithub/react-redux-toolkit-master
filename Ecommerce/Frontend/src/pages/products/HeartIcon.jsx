import React from "react";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favourites/favouriteSlice";

import {
  addToFavoritesToLocalStorage,
  removeFromFavoritesFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";

export default function HeartIcon({ ptoduct }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // get the favourites from the store
  const isFavorite = favorites.some((favorite) => favorite._id === ptoduct._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [favorites]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(ptoduct));
      removeFromFavoritesFromLocalStorage(ptoduct);
    } else {
      dispatch(addToFavorites(ptoduct));
      addToFavoritesToLocalStorage(ptoduct);
    }
  };
  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
}
