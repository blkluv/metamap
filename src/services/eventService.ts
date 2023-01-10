import axios, { AxiosError } from "axios";
import { Event } from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/events";

class EventService {
  http = axios.create({ baseURL: BASE_URL });

  async getEvents() {
    try {
      const response = await this.http.get<Event[]>("/");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addEvent(event: Event) {
    try {
      const response = await this.http.post<Event>("/", event);
      notify("New event added.");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async joinEvent(id: string | undefined) {
    try {
      const response = await this.http.patch<Event>(`/join/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async leaveEvent(id: string | undefined) {
    try {
      const response = await this.http.patch<Event>(`/leave/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async rateEvent(id: string | undefined, rating: number) {
    try {
      const response = await this.http.patch<Event>(`/rate/${id}`, { rating });
      notify("Your rating has been saved.");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async deleteEvent(id: string | undefined) {
    try {
      const response = await this.http.delete(`/${id}`);
      notify("Event deleted.");
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

export default new EventService();
