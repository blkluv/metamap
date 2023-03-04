import { configureStore } from "@reduxjs/toolkit";
import reducer from "../../store/mainReducer";

export const setupStore = (preloadedState: {}) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};
