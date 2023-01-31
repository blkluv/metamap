import axios, { AxiosError } from "axios";
import { notify } from "../utils/notifications";

const BASE_URL =
  "https://geoevents-api-production.up.railway.app/communication";

class CommunicationService {
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

  async getUserMessages(id: string | undefined) {
    try {
      const response = await this.http.get<any>(`/messages/user/${id}`);
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

  async getNotifications(id: string | undefined) {
    try {
      const response = await this.http.get<any>(`/notifications/${id}`);
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

  async readMessage(id: string | undefined) {
    try {
      const response = await this.http.patch<any>(`/message/read/${id}`);
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

  async deleteConversation(id: string | undefined) {
    try {
      const response = await this.http.delete(`/conversation/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addNotification(notification: object) {
    try {
      const response = await this.http.post<any>(
        "/notification/",
        notification
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

  async readNotification(id: string | undefined) {
    try {
      const response = await this.http.patch<any>(`/notification/read/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async deleteNotification(id: string | undefined) {
    try {
      const response = await this.http.delete(`/notification/${id}`);
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

export default new CommunicationService();
