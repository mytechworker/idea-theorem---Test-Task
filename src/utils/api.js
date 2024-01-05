import axios from "axios";

const API_BASE_URL = "https://fullstack-test-navy.vercel.app/api";

export const createUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/users/create`, userData);
};
