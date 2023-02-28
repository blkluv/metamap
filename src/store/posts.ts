// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { notify } from "../utils/notifications";
import { getStoreData } from "./utils";
import * as api from "../api/api";
import { Comment, Post } from "../utils/interfaces";

const INITIAL_STATE = {
  status: null,
  data: {
    userPosts: [],
    followingPosts: [],
  },
};

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (id: string) => {
    try {
      const { data } = await api.getUserPosts(id);
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

export const getFollowingPosts = createAsyncThunk(
  "posts/getFollowingPosts",
  async () => {
    try {
      const { data } = await api.getFollowingPosts();
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

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (formData: Post) => {
    try {
      const { data } = await api.addPost(formData);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    try {
      const { data } = await api.deletePost(id);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id: string) => {
    try {
      const { data } = await api.likePost(id);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (commentData: { postId: string; comment: Comment }) => {
    try {
      const { data } = await api.addComment(commentData);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentData: { postId: string; commentId: string }) => {
    try {
      const { data } = await api.deleteComment(commentData);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const likeComment = createAsyncThunk(
  "posts/likeComment",
  async (commentData: { postId: string; commentId: string }) => {
    try {
      const { data } = await api.likeComment(commentData);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const dislikeComment = createAsyncThunk(
  "posts/dislikeComment",
  async (commentData: { postId: string; commentId: string }) => {
    try {
      const { data } = await api.dislikeComment(commentData);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

const slice = createSlice({
  name: "posts",
  initialState: getStoreData("posts", INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.followingPosts = [
          action.payload,
          ...state.data.followingPosts,
        ];
        state.status = "success";
      })
      .addCase(getUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = action.payload;
        }
        state.status = "success";
      })
      .addCase(getFollowingPosts.fulfilled, (state, action) => {
        state.data.followingPosts = action.payload;
        state.status = "success";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.data.userPosts = state.data.userPosts.filter(
          (elem: Post) => elem._id !== action.payload._id
        );
        state.data.followingPosts = state.data.followingPosts.filter(
          (elem: Post) => elem._id !== action.payload._id
        );
        state.status = "success";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.data.userPosts = state.data.userPosts.map((elem: Post) =>
          elem._id === action.payload._id ? action.payload : elem
        );
        state.data.followingPosts = state.data.followingPosts.map(
          (elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
        );
        state.status = "success";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.data.userPosts = state.data.userPosts.map((elem: Post) =>
          elem._id === action.payload._id ? action.payload : elem
        );
        state.data.followingPosts = state.data.followingPosts.map(
          (elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
        );
        state.status = "success";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.data.userPosts = state.data.userPosts.map((elem: Post) =>
          elem._id === action.payload._id ? action.payload : elem
        );
        state.data.followingPosts = state.data.followingPosts.map(
          (elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
        );
        state.status = "success";
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.data.userPosts = state.data.userPosts.map((elem: Post) =>
          elem._id === action.payload._id ? action.payload : elem
        );
        state.data.followingPosts = state.data.followingPosts.map(
          (elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
        );
        state.status = "success";
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        state.data.userPosts = state.data.userPosts.map((elem: Post) =>
          elem._id === action.payload._id ? action.payload : elem
        );
        state.data.followingPosts = state.data.followingPosts.map(
          (elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
        );
        state.status = "success";
      });
  },
});

export default slice.reducer;
