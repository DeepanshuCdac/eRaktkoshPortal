import axios from "axios";
import { BaseUrl } from "../utils/url";

export const logSearch = async (searchData) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/eraktkosh/search-log`,
      searchData,
      {
        timeout: 2000,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Search logging failed with status:",
        error.response.status
      );
    } else if (error.request) {
      console.error("No response received for search log");
    } else {
      console.error("Error setting up search log request:", error.message);
    }
  }
};
