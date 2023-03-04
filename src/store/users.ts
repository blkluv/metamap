import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { notify } from "../utils/notifications";
import { getStoreData } from "./utils";
import * as api from "../api/api";

export const getUsers = async () => {
  try {
    const { data } = await api.getUsers();
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      notify("Users not found");
    } else if (typeof error === "string") {
      notify(error);
    }
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await api.getUser(id);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      notify("User not found");
    } else if (typeof error === "string") {
      notify(error);
    }
  }
};

const slice = createSlice({
  name: "users",
  initialState: getStoreData("users", {}),
  reducers: {},
  extraReducers: (_builder) => {},
});

export default slice.reducer;
