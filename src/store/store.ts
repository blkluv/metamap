import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import reducer from "./mainReducer";
import communicationMiddleware from "./middleware/communicationMiddleware";

const configStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(communicationMiddleware),
  });
};

const store = configStore();

store.subscribe(() => {
  if (localStorage.getItem("auth")) {
    localStorage.setItem("geoevents", JSON.stringify(store.getState()));
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
