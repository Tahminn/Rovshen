import axios from "axios";
import serverApi from "./api.json"

const register = (username, email, password) => {
  return axios.post(`${serverApi.serverNameForAccount}/Register`, {
    username,
    email,
    password,
  });
};
const login = (email, password) => {
  return axios
    .post(`${serverApi.serverNameForAccount}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
