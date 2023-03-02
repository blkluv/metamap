import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    const { data } = await api.getUserPosts(id);
    return data;
  }
);

export const getFollowingPosts = createAsyncThunk(
  "posts/getFollowingPosts",
  async () => {
    const { data } = await api.getFollowingPosts();
    return data;
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (formData: Post) => {
    const { data } = await api.addPost(formData);
    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    const { data } = await api.deletePost(id);
    return data;
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id: string) => {
    const { data } = await api.likePost(id);
    return data;
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (commentData: { postId: string; comment: Comment }) => {
    const { data } = await api.addComment(commentData);
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (commentData: { postId: string; commentId: string }) => {
    const { data } = await api.deleteComment(commentData);
    return data;
  }
);

export const likeComment = createAsyncThunk(
  "posts/likeComment",
  async (commentData: { postId: string; commentId: string }) => {
    const { data } = await api.likeComment(commentData);
    return data;
  }
);

export const dislikeComment = createAsyncThunk(
  "posts/dislikeComment",
  async (commentData: { postId: string; commentId: string }) => {
    const { data } = await api.dislikeComment(commentData);
    return data;
  }
);

const slice = createSlice({
  name: "posts",
  initialState: getStoreData("posts", INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.followingPosts = [
            action.payload,
            ...state.data.followingPosts,
          ];
        }
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
        if (action.payload) {
          state.data.followingPosts = action.payload;
          state.status = "success";
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = state.data.userPosts.filter(
            (elem: Post) => elem._id !== action.payload._id
          );
          state.data.followingPosts = state.data.followingPosts.filter(
            (elem: Post) => elem._id !== action.payload._id
          );
        }
        state.status = "success";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = state.data.userPosts.map((elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
          );
          state.data.followingPosts = state.data.followingPosts.map(
            (elem: Post) =>
              elem._id === action.payload._id ? action.payload : elem
          );
        }
        state.status = "success";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = state.data.userPosts.map((elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
          );
          state.data.followingPosts = state.data.followingPosts.map(
            (elem: Post) =>
              elem._id === action.payload._id ? action.payload : elem
          );
        }
        state.status = "success";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = state.data.userPosts.map((elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
          );
          state.data.followingPosts = state.data.followingPosts.map(
            (elem: Post) =>
              elem._id === action.payload._id ? action.payload : elem
          );
        }
        state.status = "success";
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = state.data.userPosts.map((elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
          );
          state.data.followingPosts = state.data.followingPosts.map(
            (elem: Post) =>
              elem._id === action.payload._id ? action.payload : elem
          );
        }
        state.status = "success";
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.userPosts = state.data.userPosts.map((elem: Post) =>
            elem._id === action.payload._id ? action.payload : elem
          );
          state.data.followingPosts = state.data.followingPosts.map(
            (elem: Post) =>
              elem._id === action.payload._id ? action.payload : elem
          );
        }
        state.status = "success";
      });
  },
});

export default slice.reducer;
