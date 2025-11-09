import axios from "axios";

const AxiosProxyInstance = axios.create({
  withCredentials: true,
});

export default AxiosProxyInstance;
