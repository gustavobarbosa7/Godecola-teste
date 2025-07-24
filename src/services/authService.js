import api from "./api";

const login = async (credentials) => {
  const response = await api.post("/Auth/signin", credentials);
  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
  }

  return response.data;
};

const logout = async () => {
  await api.post("/Auth/signout");
  localStorage.removeItem("token");
};

const signup = async (userData) => {
  const response = await api.post("/Auth/signup", userData);
  return response.data;
};

export default { login, logout, signup };
