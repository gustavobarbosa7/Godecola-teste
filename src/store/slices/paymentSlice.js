import { createSlice } from '@reduxjs/toolkit';
import { createPayment } from '../actions/paymentActions';
import { logout } from './authSlice';

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    paymentSession: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentSession: (state) => {
      state.paymentSession = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentSession = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao criar sessão de pagamento';
      })
      // Logout
      .addCase(logout, (state) => {
        state.paymentSession = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearPaymentSession } = paymentSlice.actions;
export default paymentSlice.reducer;