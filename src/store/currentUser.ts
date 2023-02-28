import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from "../utils/notifications";
import { getStoreData } from "./utils";
import { AxiosError } from "axios";
import * as api from "../api/api";
import { googleLogout } from "@react-oauth/google";
import { UserForm, UserUpdateReq } from "../utils/interfaces";

const INITIAL_STATE = {
  status: null,
  data: null,
};

export const signin = createAsyncThunk(
  "currentUser/signin",
  async (formData: UserForm) => {
    try {
      const { data } = await api.signIn(formData);
      notify(`Hello ${data.user.name}`);
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

export const externalSignin = createAsyncThunk(
  "currentUser/externalSignin",
  async (token: string) => {
    try {
      const { data } = await api.externalSignIn(token);
      notify(`Hello ${data.user.name}`);
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

export const signUpDemo = createAsyncThunk(
  "currentUser/signUpDemo",
  async () => {
    try {
      const { data } = await api.signUpDemo();
      notify(`Hello ${data.user.name}`);
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

export const signUp = createAsyncThunk(
  "currentUser/signUp",
  async (formData: UserForm) => {
    try {
      const { data } = await api.signUp(formData);
      notify(`Hello ${data.user.name}`);
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

export const resetPassword = createAsyncThunk(
  "currentUser/resetPassword",
  async (email: string) => {
    try {
      await api.resetPassword(email);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "currentUser/updatePassword",
  async (formData: UserForm) => {
    try {
      const { data } = await api.updatePassword(formData);
      data && notify("Password updated");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "currentUser/changePassword",
  async (formData: UserForm) => {
    try {
      await api.changePassword(formData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "currentUser/deleteUser",
  async () => {
    try {
      const { data } = await api.deleteUser();
      !data && notify("Account deleted");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "currentUser/updateUser",
  async (formData: UserUpdateReq) => {
    try {
      const { data } = await api.updateUser(formData);
      notify("Data updated");
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

export const followUser = createAsyncThunk(
  "currentUser/followUser",
  async (id: string) => {
    try {
      const { data } = await api.followUser(id);
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
  name: "currentUser",
  initialState: getStoreData("currentUser", INITIAL_STATE),
  reducers: {
    logout: (state) => {
      localStorage.removeItem("geoevents");
      state.data = null;
      state.status = null;
      googleLogout();
    },
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    connect: (state) => {
      state.data.connected = true;
    },
    disconnect: (state) => {
      state.data.connected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("auth", JSON.stringify(action.payload.token));
          state.data = action.payload.user;
        }
        state.status = "success";
      })
      .addCase(signin.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(externalSignin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(externalSignin.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("auth", JSON.stringify(action.payload.token));
          state.data = action.payload.user;
        }
        state.status = "success";
      })
      .addCase(externalSignin.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(signUpDemo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpDemo.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("auth", JSON.stringify(action.payload.token));
          state.data = action.payload.user;
        }
        state.status = "success";
      })
      .addCase(signUpDemo.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload) {
          localStorage.setItem("auth", JSON.stringify(action.payload.token));
          state.data = action.payload.user;
        }
        state.status = "success";
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "success";
        notify("Email sent (check SPAM folder)");
      })
      .addCase(resetPassword.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(changePassword.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(updatePassword.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "success";
        state.data = null;
        localStorage.removeItem("auth");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("users");
        googleLogout();
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        action.payload?.activeUser && (state.data = action.payload.activeUser);
        state.status = "success";
      })
      .addCase(followUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout, setCurrentUser } = slice.actions;
export default slice.reducer;
