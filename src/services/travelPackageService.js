import api from "./api";

const travelPackageService = {

  getTravelPackages: async () => {
    const response = await api.get("/TravelPackage");
    return response.data;
  },

  createTravelPackage: async (packageData) => {
    const response = await api.post("/TravelPackage", packageData);
    return response.data;
  },

  getTravelPackageById: async (id) => {
    const response = await api.get(`/TravelPackage/${id}`);
    return response.data;
  },

  updateTravelPackageById: async (id, packageData) => {
    const response = await api.put(`/TravelPackage/${id}`, packageData);
    return response.data;
  },

  deleteTravelPackageById: async (id) => {
    const response = await api.delete(`/TravelPackage/${id}`);
    return response.data;
  },
};

export default travelPackageService;
