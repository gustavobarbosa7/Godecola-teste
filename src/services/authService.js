import api from "./api";


export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
    
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

const logout = async () => {
  await api.post("/auth/signout");
  localStorage.removeItem("token");
};

const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export default { login, logout, signup };
