import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStoreData } from "./utils";
import * as api from "../api/api";
import {
  ChatConversation,
  ChatMessage,
  Notification,
} from "../utils/interfaces";

const INITIAL_STATE = {
  status: null,
  data: {
    messages: [],
    userMessages: [],
    conversations: [],
    notifications: [],
    currentConversation: null,
    targetElement: null,
    onlineUsers: [],
  },
};

export const getConversations = createAsyncThunk(
  "communication/getConversations",
  async (id: string) => {
    const { data } = await api.getConversations(id);
    return data;
  }
);

export const getMessages = createAsyncThunk(
  "communication/getMessages",
  async (id: string) => {
    const { data } = await api.getMessages(id);
    return data;
  }
);

export const getUserMessages = createAsyncThunk(
  "communication/getUserMessages",
  async (id: string) => {
    const { data } = await api.getUserMessages(id);
    return data;
  }
);

export const readMessage = createAsyncThunk(
  "communication/readMessage",
  async (id: string) => {
    const { data } = await api.readMessage(id);
    return data;
  }
);

export const addMessage = createAsyncThunk(
  "communication/addMessage",
  async (message: ChatMessage) => {
    const { data } = await api.addMessage(message);
    return data;
  }
);

export const addConversation = createAsyncThunk(
  "communication/addConversation",
  async (conversation: ChatConversation) => {
    const { data } = await api.addConversation(conversation);
    return data;
  }
);

export const getMembersConversation = createAsyncThunk(
  "communication/getMembersConversation",
  async (membersData: { firstUserId: string; secondUserId: string }) => {
    const { data } = await api.getMembersConversation(membersData);
    return data;
  }
);

export const deleteConversation = createAsyncThunk(
  "communication/deleteConversation",
  async (id: string) => {
    const { data } = await api.deleteConversation(id);
    return data;
  }
);

export const getNotifications = createAsyncThunk(
  "communication/getNotifications",
  async (id: string) => {
    const { data } = await api.getNotifications(id);
    return data;
  }
);

export const addNotification = createAsyncThunk(
  "communication/addNotification",
  async (notification: Notification) => {
    const { data } = await api.addNotification(notification);
    return data;
  }
);

export const readNotification = createAsyncThunk(
  "communication/readNotification",
  async (id: string) => {
    const { data } = await api.readNotification(id);
    return data;
  }
);

export const deleteNotification = createAsyncThunk(
  "communication/deleteNotification",
  async (id: string) => {
    const { data } = await api.deleteNotification(id);
    return data;
  }
);

const slice = createSlice({
  name: "communication",
  initialState: getStoreData("communication", INITIAL_STATE),
  reducers: {
    setCurrentConversation: (state, action) => {
      state.data.currentConversation = action.payload;
    },
    setArrivalMessage: (state, action) => {
      if (action.payload) {
        state.data.messages = [...state.data.messages, action.payload];
        state.data.userMessages = [...state.data.userMessages, action.payload];
      }
    },
    setArrivalNotification: (state, action) => {
      if (action.payload) {
        state.data.notifications = [
          action.payload,
          ...state.data.notifications,
        ];
      }
    },
    // for reading a message
    updateMessage: (state, action) => {
      if (action.payload) {
        state.data.messages = state.data.messages.map((message: ChatMessage) =>
          message._id === action.payload._id ? action.payload : message
        );
        state.data.userMessages = state.data.userMessages.map(
          (message: ChatMessage) =>
            message._id === action.payload._id ? action.payload : message
        );
      }
    },
    setMessages: (state, action) => {
      state.data.messages = action.payload;
    },
    setUserMessages: (state, action) => {
      state.data.userMessages = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.data.onlineUsers = action.payload;
    },
    setTargetElement: (state, action) => {
      state.data.targetElement = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.conversations = action.payload;
        }
        state.status = "success";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.messages = action.payload;
        }
        state.status = "success";
      })
      .addCase(getUserMessages.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userMessages = action.payload;
        }
        state.status = "success";
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        if (action.payload) {
          const mapMessage = (message: ChatMessage) =>
            message._id === action.payload?._id ? action.payload : message;

          state.data.messages = state.data.messages.map(mapMessage);
          state.data.userMessages = state.data.userMessages.map(mapMessage);
        }
        state.status = "success";
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.messages = [...state.data.messages, action.payload];
        }
        state.status = "success";
      })
      .addCase(addConversation.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.conversations = [
            ...state.data.conversations,
            action.payload,
          ];
          state.data.currentConversation = action.payload;
        }
        state.status = "success";
      })
      .addCase(getMembersConversation.fulfilled, (state, action) => {
        if (action.payload) {
          const ifExists = state.data.conversations.find(
            (conversation: ChatConversation) =>
              conversation._id === action.payload._id
          );

          if (!ifExists) {
            state.data.conversations = [
              ...state.data.conversations,
              action.payload,
            ];
            state.data.currentConversation = action.payload;
          } else {
            state.data.currentConversation = action.payload;
          }
        }
        state.status = "success";
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.conversations = state.data.conversations.filter(
            (elem: ChatConversation) => elem._id !== action.payload._id
          );
          state.data.currentConversation = null;
        }
        state.status = "success";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.notifications = action.payload;
        }
        state.status = "success";
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        if (action.payload) {
          const mapNotification = (notification: Notification) =>
            notification._id === action.payload?._id
              ? action.payload
              : notification;

          state.data.notifications =
            state.data.notifications.map(mapNotification);
        }
        state.status = "success";
      })
      .addCase(addNotification.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.notifications = state.data.notifications.filter(
            (elem: Notification) => elem._id !== action.payload._id
          );
        }
        state.status = "success";
      });
  },
});

export const {
  setCurrentConversation,
  setArrivalMessage,
  setArrivalNotification,
  setMessages,
  setUserMessages,
  setOnlineUsers,
  setTargetElement,
  updateMessage,
} = slice.actions;
export default slice.reducer;
