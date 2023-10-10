import axios from "axios";

export const baseURL = "https://v1.checkprojectstatus.com/vistrit/api/";

const axiosInstacnce = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstacnce;
