import api from "./api";

const userService = {

  getUsers: async () => {
    const response = await api.get("/Users/getall");
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/Users/getbyid/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post("/Users/create", userData);
    return response.data;
  },

  updateUserById: async (id, userData) => {
    const response = await api.put(`/Users/update/${id}`, userData);
    return response.data;
  },

  deleteUserById: async (id) => {
    const response = await api.delete(`/Users/delete/id/${id}`);
    return response.data;
  },

    deleteUserByDocument: async (document) => {
    const response = await api.delete(`/Users/delete/document/${document}`);
    return response.data;
  },
};

export default userService;
