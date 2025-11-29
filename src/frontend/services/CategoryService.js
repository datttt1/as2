import axios from "axios";
const API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : process.env.VITE_API_URL) + "/api/category";

export const getAll = async() =>{
    const response = await axios.get(`${API_URL}`);
    return response.data;
}