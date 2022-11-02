import axios from "axios";
import { Event } from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000";

class EventService {
  http = axios.create({ baseURL: BASE_URL });

  async getEvents() {
    try {
      const response = await this.http.get<Event[]>("/events");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addEvent(event: Event) {
    try {
      const response = await this.http.post<Event>("/events", event);
      notify("New event added.");
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

export default new EventService();
