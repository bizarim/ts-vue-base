import axios from "axios";
import { ApiResponse } from "../types";

export const refreshAccessToken = async (baseUrl: string): Promise<string | undefined> => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await axios.post(baseUrl + "/auth/refresh/token", {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`
        }
      });
      const res = response.data as ApiResponse;
      const token = res.data as string;
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("last_action", Date.now().toString());
      return Promise.resolve(token);
    } catch (e) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("last_action");
      return Promise.reject(new Error(""));
    }
  }
  return Promise.reject(new Error(""));
};
