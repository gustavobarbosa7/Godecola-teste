import api from "./api";

const bookingService = {

    getbookings: async () => {
        const response = await api.get("/reservations");
        return response.data;
    },

    createbooking: async (bookingData) => {
        const response = await api.post("/reservations", bookingData);
        return response.data;
    },

    getbookingById: async (id) => {
        const response = await api.get(`/reservations/${id}`);
        return response.data;
    }

};

export default bookingService;
