import axios from "axios";
import { Post } from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/posts";

class PostService {
  http = axios.create({ baseURL: BASE_URL });

  async getFollowingPosts() {
    try {
      const response = await this.http.get<Post[]>("/following");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async getUsersPosts(id: string | undefined) {
    try {
      const response = await this.http.get<Post[]>(`/user/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addPost(post: object) {
    try {
      const response = await this.http.post<Post>("/", post);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async likePost(id: string | undefined) {
    try {
      const response = await this.http.patch<Post>(`/like/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async deletePost(id: string | undefined) {
    try {
      const response = await this.http.delete(`/${id}`);
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

export default new PostService();
