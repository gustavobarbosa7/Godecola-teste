import { createAsyncThunk } from '@reduxjs/toolkit';
import travelPackageService from '../services/travelPackageService';

export const fetchTravelPackages = createAsyncThunk(
    'travelPackages/fetchTravelPackages',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await travelPackageService.getTravelPackages(auth.token);
            console.log('Pacotes recuperados:', response);
            return response;
        } catch (error) {
            console.error('Erro ao buscar pacotes:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchTravelPackageById = createAsyncThunk(
    'travelPackages/fetchTravelPackageById',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await travelPackageService.getTravelPackageById(id, auth.token);
            console.log('Detalhes do pacote:', response);
            return response;
        } catch (error) {
            console.error('Erro ao buscar detalhes do pacote:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createTravelPackage = createAsyncThunk(
    'travelPackages/createTravelPackage',
    async (packageData, { getState, rejectWithValue, dispatch }) => {
        try {
            const { auth } = getState();
            const response = await travelPackageService.createTravelPackage(packageData, auth.token);
            console.log('Pacote criado:', response);
            dispatch(fetchTravelPackages());
            return response;
        } catch (error) {
            console.error('Erro ao criar pacote:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateTravelPackageById = createAsyncThunk(
    'travelPackages/updateTravelPackageById',
    async ({ id, packageData }, { getState, rejectWithValue, dispatch }) => {
        try {
            const { auth } = getState();
            const response = await travelPackageService.updateTravelPackageById(id, packageData, auth.token);
            console.log('Pacote atualizado:', response);
            dispatch(fetchTravelPackages()); // Atualiza a lista após atualizar
            return response;
        } catch (error) {
            console.error('Erro ao atualizar pacote:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteTravelPackageById = createAsyncThunk(
    'travelPackages/deleteTravelPackageById',
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const { auth } = getState();
            await travelPackageService.deleteTravelPackageById(id, auth.token);
            console.log('Pacote excluído:', id);
            dispatch(fetchTravelPackages()); // Atualiza a lista após excluir
            return id;
        } catch (error) {
            console.error('Erro ao excluir pacote:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);