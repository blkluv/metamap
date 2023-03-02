import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notify } from "../utils/notifications";
import { getStoreData } from "./utils";
import * as api from "../api/api";
import { googleLogout } from "@react-oauth/google";
import { UserForm, UserHeader, UserUpdateReq } from "../utils/interfaces";

const INITIAL_STATE = {
  status: null,
  data: null,
};

export const signin = createAsyncThunk(
  "currentUser/signin",
  async (formData: UserForm) => {
    const { data } = await api.signIn(formData);
    data && notify(`Hello ${data.user.name}`);
    return data;
  }
);

export const externalSignin = createAsyncThunk(
  "currentUser/externalSignin",
  async (token: string) => {
    const { data } = await api.externalSignIn(token);
    data && notify(`Hello ${data.user.name}`);
    return data;
  }
);

export const signUpDemo = createAsyncThunk(
  "currentUser/signUpDemo",
  async () => {
    const { data } = await api.signUpDemo();
    data && notify(`Hello ${data.user.name}`);
    return data;
  }
);

export const signUp = createAsyncThunk(
  "currentUser/signUp",
  async (formData: UserForm) => {
    const { data } = await api.signUp(formData);
    data && notify(`Hello ${data.user.name}`);
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  "currentUser/resetPassword",
  async (email: string) => {
    await api.resetPassword(email);
  }
);

export const updatePassword = createAsyncThunk(
  "currentUser/updatePassword",
  async (formData: UserForm) => {
    const { data } = await api.updatePassword(formData);
    data && notify("Password updated");
  }
);

export const changePassword = createAsyncThunk(
  "currentUser/changePassword",
  async (formData: UserForm) => {
    await api.changePassword(formData);
  }
);

export const deleteUser = createAsyncThunk(
  "currentUser/deleteUser",
  async () => {
    const { data } = await api.deleteUser();
    !data && notify("Account deleted");
  }
);

export const updateUser = createAsyncThunk(
  "currentUser/updateUser",
  async (formData: UserUpdateReq) => {
    const { data } = await api.updateUser(formData);
    notify("Data updated");
    return data;
  }
);

export const followUser = createAsyncThunk(
  "currentUser/followUser",
  async (id: string) => {
    const { data } = await api.followUser(id);
    return data;
  }
);

const slice = createSlice({
  name: "currentUser",
  initialState: getStoreData("currentUser", INITIAL_STATE),
  reducers: {
    logout: (state) => {
      localStorage.removeItem("geoevents");
      localStorage.removeItem("auth");
      state.data = null;
      state.status = null;
      googleLogout();
    },
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    setUserUpdate: (state, action) => {
      const newFollower = {
        _id: action.payload.activeUser._id,
        name: action.payload.activeUser.name,
      };
      const ifFollower = state.data.followers.find(
        (user: UserHeader) => user._id === newFollower._id
      );
      if (!ifFollower) {
        state.data.followers = [...state.data.followers, newFollower];
      }
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
        if (action.payload) {
          action.payload?.activeUser &&
            (state.data = action.payload.activeUser);
        }
        state.status = "success";
      })
      .addCase(followUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout, setCurrentUser, setUserUpdate } = slice.actions;
export default slice.reducer;
