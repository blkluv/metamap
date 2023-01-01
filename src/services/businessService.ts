import axios, { AxiosError } from "axios";
import { Business } from "../utils/interfaces";
import { notify } from "../utils/notifications";

const BASE_URL = "http://localhost:5000/businesses";

class BusinessService {
  http = axios.create({ baseURL: BASE_URL });

  async getBusinesses() {
    try {
      const response = await this.http.get<Business[]>("/");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async addBusiness(business: Business) {
    try {
      const response = await this.http.post<Business>("/", business);
      notify("New business added.");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        notify(error.response?.data.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  }

  async likeBusiness(id: string | undefined) {
    try {
      const response = await this.http.patch<Business>(`/like/${id}`);
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

export default new BusinessService();
