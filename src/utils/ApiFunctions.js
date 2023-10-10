import { toast } from "react-toastify";
import AxiosInstance, { baseURL } from "../utils/AxiosInstance";

export const GetFunction = async (Url) => {
  const token = localStorage.getItem("auth_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await AxiosInstance.get(
      Url,
      // Url + "?" + "page=" + page + "&" + "limit=" + limit,
      config
    );
    if (res.status == 200) {
      return res;
    }
  } catch (error) {
    return toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};

export const SubmitResponse = async (URL, values = {}) => {
  const token = localStorage.getItem("auth_token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await AxiosInstance.post(URL, values, config);
    if (res.status == 200) {
      return res;
    }
  } catch (error) {
    return toast.error(error.response.data.message);
  }
};

export const ImageBaseUrl =
  "https://v1.checkprojectstatus.com/vistrit/" + "public";
// export const ImageBaseUrl = "https://stars-ai.com:4000/star-backend";
export const handleimageUrl = (url) => {
  return url != undefined
    ? url?.startsWith("http") || url?.startsWith("https")
      ? url
      : ImageBaseUrl + "/" + url
    : "";
};

export const DownloadGloabal = async (url, filename) => {
  const imageUrl = handleimageUrl(url); // Replace with your image URL

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    toast.error("something went wrong");
    console.error("Error downloading file:", error);
  }
};

