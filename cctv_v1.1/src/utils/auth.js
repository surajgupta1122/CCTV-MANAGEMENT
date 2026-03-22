import axiosInstance from "./axios";

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/dashboard");
    return res.data.user;
  } catch (error) {
    return null;
  }
};