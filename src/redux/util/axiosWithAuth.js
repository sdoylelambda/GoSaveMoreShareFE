import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  // get API base url
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
