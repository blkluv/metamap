import axios from "axios";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/posts";

class PostService {
  http = axios.create({ baseURL: BASE_URL });

  async getPosts() {
    try {
      const response = await this.http.get("/");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addPost(post: any) {
    try {
      const response = await this.http.post("/", post);
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
