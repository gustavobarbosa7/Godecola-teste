import { createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/paymentSevice';

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await paymentService.createpayment(paymentData, auth.token);
      console.log('Sessão de pagamento criada:', response);
      return response;
    } catch (error) {
      console.error('Erro ao criar sessão de pagamento:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);