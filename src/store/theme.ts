import { createSlice } from "@reduxjs/toolkit";
import { getStoreData } from "./utils";

const light = {
  primary: "white",
  divider: "rgb(120,120,126)",
  border: "rgb(252,251,255,.3)",
  warning: "rgb(235, 110, 105)",
  blue: "#2196f3",
  green: "yellowgreen",
  background: {
    primary: "rgb(245,240,250)",
    secondary: "rgb(102,178,255)",
    tertiary: "rgb(252,251,255)",
    warning: "rgb(235, 110, 105,0.5)",
  },
  text: {
    primary: "grey",
    secondary: "white",
    tertiary: "black",
  },
  map: {
    style: "streets",
  },
};

const dark = {
  primary: "rgb(31,30,43)",
  divider: "rgb(120,120,126)",
  warning: "rgb(235, 110, 105)",
  border: "rgb(53,51,64)",
  blue: "#2196f3",
  green: "yellowgreen",
  background: {
    primary: "rgb(35,35,48)",
    secondary: "rgb(31,30,43)",
    tertiary: "rgb(53,51,64)",
    warning: "rgb(235, 110, 105,0.5)",
  },
  text: {
    primary: "white",
    secondary: "rgb(120,120,126)",
    tertiary: "white",
  },
  map: {
    style: "streets-v2-dark",
  },
};

const INITIAL_STATE = {
  mode: "light",
  palette: light,
};

const slice = createSlice({
  name: "theme",
  initialState: getStoreData("theme", INITIAL_STATE),
  reducers: {
    setTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.palette = state.mode === "light" ? light : dark;
    },
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;
