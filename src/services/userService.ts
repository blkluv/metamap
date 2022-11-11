import axios from "axios";
import { User } from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/users";

class UserService {
  http = axios.create({ baseURL: BASE_URL });

  async signUp(user: User) {
    try {
      const response = await this.http.post<User>("/signup", user);
      notify(`Welcome ${user.username}.`);
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
      const response = await this.http.post<User>("/signin", user);
      notify(`Welcome ${user.username}.`);
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
    console.log(email);
    try {
      const response = await this.http.post<User>("/resetpassword", { email });
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
      const response = await this.http.patch<User>(
        `/changepassword/${token}`,
        data
      );
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
