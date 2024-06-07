import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "./features/favourites/favouriteSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import cartSliceReducer from "./features/cart/cartSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
  },
  /* The `preloadedState` field in the `configureStore` function is used to provide the initial state for
the Redux store. In this specific code snippet, it is setting the initial state for the `favorites`
slice of the Redux store to the value of `initialFavorites`. */
  preloadedState: {
    favorites: initialFavorites,
  },

  /* This part of the code snippet is configuring the middleware for the Redux store. */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
