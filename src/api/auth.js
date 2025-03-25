import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Base API URL

export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/admin/adminLogin`, { firstName : username, password });
    console.log(res);
    
    return res.data; // Return the response data (user & token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
