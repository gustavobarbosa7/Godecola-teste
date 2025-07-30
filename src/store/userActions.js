import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';
import { getToken, parseJwt } from '../utils/jwt';
import { getAvatarUrl } from '../services/avatarService'

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error('Token não encontrado');
      const decoded = parseJwt(token);
      const userId = decoded?.nameid || decoded?.sub;
      if (!userId) throw new Error('ID do usuário não encontrado no token');
      const userData = await userService.getUserById(userId);
      const normalizedUserData = userData.data || userData;
      const userWithAvatar = {
        ...normalizedUserData,
        avatar: getAvatarUrl(normalizedUserData.firstName, normalizedUserData.lastName),
      };
      console.log('Usuário recuperado:', userWithAvatar);
      return userWithAvatar;
    } catch (error) {
      console.error('Fetch user error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return rejectWithValue(error.message);
    }
  }
);