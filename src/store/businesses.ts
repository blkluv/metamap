// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/api";
import { getStoreData } from "./utils";
import { AxiosError } from "axios";
import { notify } from "../utils/notifications";
import { Business } from "../utils/interfaces";

const INITIAL_STATE = {
  status: null,
  data: {
    businesses: [],
    selectedBusiness: null,
  },
};

export const addBusiness = createAsyncThunk(
  "businesses/addBusiness",
  async (business: Business) => {
    try {
      const { data } = await api.addBusiness(business);
      notify("Business created");
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const likeBusiness = createAsyncThunk(
  "businesses/likeBusiness",
  async (id: string) => {
    try {
      const { data } = await api.likeBusiness(id);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const rateBusiness = createAsyncThunk(
  "businesses/rateBusiness",
  async (rateData: { id: string | undefined; rating: number }) => {
    try {
      const { data } = await api.rateBusiness(rateData);
      notify("Rating saved");
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const getBusinesses = createAsyncThunk(
  "businesses/getBusinesses",
  async () => {
    try {
      const { data } = await api.getBusinesses();
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const deleteBusiness = createAsyncThunk(
  "businesses/deleteBusiness",
  async (id: string) => {
    try {
      const { data } = await api.deleteBusiness(id);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

const slice = createSlice({
  name: "businesses",
  initialState: getStoreData("businesses", INITIAL_STATE),
  reducers: {
    setSelectedBusiness: (state, action) => {
      if (state.data.businesses.length > 0) {
        if (action.payload === state.data.selectedBusiness?._id) {
          state.data.selectedBusiness = null;
        } else {
          state.data.selectedBusiness = state.data.businesses.find(
            (business: Business) => business._id === action.payload
          );
        }
      }
    },
    removeSelectedBusiness: (state) => {
      state.data.selectedBusiness = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBusiness.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.businesses = [action.payload, ...state.data.businesses];
        }
        state.status = "success";
      })
      .addCase(likeBusiness.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.businesses = state.data.businesses.map(
            (business: Business) =>
              business._id === action.payload._id ? action.payload : business
          );
          state.data.selectedBusiness = action.payload;
        }
        state.status = "success";
      })
      .addCase(rateBusiness.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.businesses = state.data.businesses.map(
            (business: Business) =>
              business._id === action.payload._id ? action.payload : business
          );
          state.data.selectedBusiness = action.payload;
        }
        state.status = "success";
      })
      .addCase(getBusinesses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBusinesses.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.businesses = action.payload;
        }
        state.status = "success";
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.businesses = state.data.businesses.filter(
            (business: Business) => business._id !== action.payload._id
          );
          if (
            state.data.selectedBusiness &&
            state.data.selectedBusiness._id === action.payload
          ) {
            state.data.selectedBusiness = null;
          }
        }
        state.status = "success";
      });
  },
});
export const { removeSelectedBusiness, setSelectedBusiness } = slice.actions;
export default slice.reducer;
