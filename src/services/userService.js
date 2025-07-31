import api from "./api";

const userService = {

  getUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  getUserByIdOrDocument: async (idOrDocument) => {
    const response = await api.get(`/users/${idOrDocument}`);
    return response.data;
  },

  getBookingByUserId: async (userId) => {
    const response = await api.get(`/users/${userId}/reservations`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  updateUserById: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUserById: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
