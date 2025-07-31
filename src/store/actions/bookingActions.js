import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/bookingService';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await bookingService.getbookings(auth.token);
      console.log('Reservas recuperadas:', response);
      return response;
    } catch (error) {
      console.error('Erro ao buscar reservas:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await bookingService.getbookingById(id, auth.token);
      console.log('Detalhes da reserva:', response);
      return response;
    } catch (error) {
      console.error('Erro ao buscar detalhes da reserva:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { getState, rejectWithValue, dispatch }) => {
    try {
      const { auth } = getState();
      const response = await bookingService.createbooking(bookingData, auth.token);
      console.log('Reserva criada:', response);
      dispatch(fetchBookings());
      return response;
    } catch (error) {
      console.error('Erro ao criar reserva:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);