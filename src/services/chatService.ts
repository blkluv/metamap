import axios, { AxiosError } from "axios";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/chat";

class ChatService {
  http = axios.create({ baseURL: BASE_URL });

  async getMessages(id: string | undefined) {
    try {
      const response = await this.http.get<any>(`/messages/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async getConversations(id: string | undefined) {
    try {
      const response = await this.http.get<any>(`/conversations/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async getMembersConversation(
    firstUserId: string | undefined,
    secondUserId: string | undefined
  ) {
    try {
      const response = await this.http.get<any>(
        `conversation/members/${firstUserId}/${secondUserId}`
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

  async addMessage(message: object) {
    try {
      const response = await this.http.post<any>("/message/", message);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addConversation(conversation: object) {
    try {
      const response = await this.http.post<any>(
        "/conversation/",
        conversation
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
}

export default new ChatService();
