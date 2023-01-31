import axios, { AxiosError } from "axios";
import { Post } from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "https://geoevents-api-production.up.railway.app/posts";

class PostService {
  http = axios.create({ baseURL: BASE_URL });

  async getFollowingPosts() {
    try {
      const response = await this.http.get<Post[]>("/following");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
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
      if (error instanceof AxiosError) {
        notify("User not found");
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
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
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
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addComment(postId: string | undefined, comment: object) {
    try {
      const response = await this.http.patch<Post>(
        `/comment/${postId}`,
        comment
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async likeComment(postId: string | undefined, commentId: string | undefined) {
    try {
      const response = await this.http.patch<Post>(
        `/comment/like/${postId}/${commentId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async dislikeComment(
    postId: string | undefined,
    commentId: string | undefined
  ) {
    try {
      const response = await this.http.patch<Post>(
        `/comment/dislike/${postId}/${commentId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async deleteComment(
    postId: string | undefined,
    commentId: string | undefined
  ) {
    try {
      const response = await this.http.patch<Post>(
        `/comment/${postId}/${commentId}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
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
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }
}

export default new PostService();
