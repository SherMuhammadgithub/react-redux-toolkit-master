import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  intialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      // check is already in favourites
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavourites, removeFromFavourites, setFavorites } =
  favouriteSlice.actions;

export const selectFavourites = (state) => state.favourites; // it will be used in the component to get the favourites from the store
export default favouriteSlice.reducer;
