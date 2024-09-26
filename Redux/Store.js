import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileid";
import productReducer from "./Slices/productSlice"

export const Store = configureStore({
  reducer: {
    profileReducer,
    products: productReducer,
  },
});
export default Store;
