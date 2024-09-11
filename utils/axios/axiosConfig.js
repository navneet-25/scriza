import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://skyably.com/api/api.php/api",
});

export default axiosClient;
