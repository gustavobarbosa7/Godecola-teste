import api from "./api";


const paymentService = {

    createpayment: async (paymentData) => {
        const response = await api.post("/payment/create-checkout-session", paymentData);
        return response.data;
    },

};

export default paymentService;