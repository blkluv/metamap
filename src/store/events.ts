//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/api";
import { getStoreData } from "./utils";
import { AxiosError } from "axios";
import { notify } from "../utils/notifications";
import { Event } from "../utils/interfaces";

const INITIAL_STATE = {
  status: null,
  data: {
    events: [],
    selectedEvent: null,
  },
};

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    const { data } = await api.getEvents();
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
    } else if (typeof error === "string") {
      notify(error);
    }
  }
});

export const joinEvent = createAsyncThunk(
  "events/joinEvent",
  async (id: string) => {
    try {
      const { data } = await api.joinEvent(id);
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

export const leaveEvent = createAsyncThunk(
  "events/leaveEvent",
  async (id: string) => {
    try {
      const { data } = await api.leaveEvent(id);
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

export const rateEvent = createAsyncThunk(
  "events/rateEvent",
  async (rateData: { id: string | undefined; rating: number }) => {
    try {
      const { data } = await api.rateEvent(rateData);
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

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (event: Event) => {
    try {
      const { data } = await api.addEvent(event);
      notify("Event created");
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

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string) => {
    try {
      const { data } = await api.deleteEvent(id);
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
  name: "events",
  initialState: getStoreData("events", INITIAL_STATE),
  reducers: {
    setSelectedEvent: (state, action) => {
      if (state.data.events.length > 0) {
        if (action.payload === state.data.selectedEvent?._id) {
          state.data.selectedEvent = null;
        } else {
          state.data.selectedEvent = state.data.events.find(
            (event: Event) => event._id === action.payload
          );
        }
      }
    },
    removeSelectedEvent: (state) => {
      state.data.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.events = [action.payload, ...state.data.events];
        }
        state.status = "success";
      })
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.events = action.payload;
        }
        state.status = "success";
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.events = state.data.events.map((event: Event) =>
            event._id === action.payload._id ? action.payload : event
          );
          state.data.selectedEvent = action.payload;
        }
        state.status = "success";
      })
      .addCase(leaveEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.events = state.data.events.map((event: Event) =>
            event._id === action.payload._id ? action.payload : event
          );
          state.data.selectedEvent = action.payload;
        }
        state.status = "success";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.events = state.data.events.filter(
            (event: Event) => event._id !== action.payload._id
          );
          if (
            state.data.selectedEvents &&
            state.data.selectedEvents._id === action.payload
          ) {
            state.data.selectedEvents = null;
          }
        }
        state.status = "success";
      })
      .addCase(rateEvent.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.events = state.data.events.map((event: Event) =>
            event._id === action.payload._id ? action.payload : event
          );
          state.data.selectedEvent = action.payload;
        }
        state.status = "success";
      });
  },
});

export const { removeSelectedEvent, setSelectedEvent } = slice.actions;
export default slice.reducer;
