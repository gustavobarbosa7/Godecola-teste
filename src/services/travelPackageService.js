import api from "./api";

const travelPackageService = {

  getTravelPackages: async () => {
    const response = await api.get("/travel-packages");
    return response.data;
  },

  createTravelPackage: async (packageData) => {
    const response = await api.post("/travel-packages", packageData);
    return response.data;
  },

  getTravelPackageById: async (id) => {
    const response = await api.get(`/travel-packages/${id}`);
    return response.data;
  },

  updateTravelPackageById: async (id, packageData) => {
    const response = await api.put(`/travel-packages/${id}`, packageData);
    return response.data;
  },

  deleteTravelPackageById: async (id) => {
    const response = await api.delete(`/travel-packages/${id}`);
    return response.data;
  },
};

export default travelPackageService;
