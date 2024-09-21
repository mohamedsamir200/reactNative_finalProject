import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileid";
export const Store = configureStore({
  reducer: {
    profileReducer,
  },
});
export default Store;
