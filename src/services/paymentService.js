
import api from "./apiService";
 
// Criar preferência de pagamento no backend
export const createPreference = async (reservationId, amount, description, payer = {}) => {
  const response = await api.post("/payments/create-preference", {
    reservationId,
    amount,
    description,
    payer: {
      firstName: payer.firstName || "",
      lastName: payer.lastName || "",
      email: payer.email || "",
    }
  });
  return response.data;
};

// Processar pagamento (webhook interno)
export const processPayment = async (paymentData) => {
  const response = await api.post("/payments/process", paymentData);
  return response.data;
};

// Verificar status do pagamento
export const getPaymentStatus = async (paymentId) => {
  const response = await api.get(`/payments/${paymentId}/status`);
  return response.data;
};

// Confirmar pagamento
export const confirmPayment = async (paymentId, reservationId) => {
  const response = await api.post(`/payments/${paymentId}/confirm`, {
    reservationId
  });
  return response.data;
};

// Cancelar pagamento
export const cancelPayment = async (paymentId, reason = "") => {
  const response = await api.post(`/payments/${paymentId}/cancel`, {
    reason
  });
  return response.data;
};

// Webhook do Mercado Pago (para notificações)
export const handleMercadoPagoWebhook = async (webhookData) => {
  const response = await api.post("/payments/webhook/mercadopago", webhookData);
  return response.data;
};