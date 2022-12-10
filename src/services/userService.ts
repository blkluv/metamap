import axios from "axios";
import {
  User,
  UserResponse,
  UserHeader,
  FollowResponse,
} from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/users";

class UserService {
  http = axios.create({ baseURL: BASE_URL });

  async getUser(id: string | undefined) {
    try {
      const response = await this.http.get<UserHeader>(`/getuser/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async getUsers() {
    try {
      const response = await this.http.get<UserHeader[]>("/getusers");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async signUp(user: User) {
    try {
      const response = await this.http.post<UserResponse>("/signup", user);
      if (response.data?.user.name) {
        notify(`Welcome ${response.data.user.name}.`);
      }
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async signIn(user: User) {
    try {
      const response = await this.http.post<UserResponse>("/signin", user);
      if (response.data?.user.name) {
        notify(`Welcome ${response.data.user.name}.`);
      }
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async externalSignIn(token: string) {
    try {
      const response = await this.http.post<UserResponse>(
        "/externalsignin",
        token
      );
      if (response.data?.user.name) {
        notify(`Welcome ${response.data.user.name}.`);
      }
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async resetPassword(email: string) {
    try {
      const response = await this.http.post("/resetpassword", { email });
      notify(response.data.message);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async changePassword(token: string, data: object) {
    try {
      const response = await this.http.patch(`/changepassword/${token}`, data);
      notify(response.data.message);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async deleteUser() {
    try {
      const response = await this.http.delete(`/deleteuser`);
      notify("Account deleted.");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async followUser(id: string) {
    try {
      const response = await this.http.patch<FollowResponse>(`/follow/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async updateUser(data: object) {
    try {
      const response = await this.http.patch<User>("/update", data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
}

export default new UserService();
