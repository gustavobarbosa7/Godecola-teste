import { createAsyncThunk } from '@reduxjs/toolkit';
import travelPackageService from '../../services/travelPackageService';

const transformPackageData = (packageData) => {

    const packageTypeMap = {
        NATIONAL: 'Nacional',
        INTERNATIONAL: 'Internacional',
    };

    const mediaTypeMap = {
        IMAGE: 'imagem',
        VIDEO: 'vídeo',
    };

    // Função para transformar um único pacote
    const transformSinglePackage = (pkg) => ({
        ...pkg,
        packageType: packageTypeMap[pkg.packageType] || pkg.packageType,
        mediasUrl: pkg.mediasUrl.map((media) => ({
            ...media,
            mediaType: mediaTypeMap[media.mediaType] || media.mediaType,
        })),
    });

    return Array.isArray(packageData)
        ? packageData.map(transformSinglePackage)
        : transformSinglePackage(packageData);
};

export const fetchTravelPackages = createAsyncThunk(
    'travelPackages/fetchTravelPackages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await travelPackageService.getTravelPackages();
            console.log('Pacotes recuperados (antes da transformação):', response);
            const transformedResponse = transformPackageData(response);
            console.log('Pacotes transformados:', transformedResponse);
            return transformedResponse;
        } catch (error) {
            console.error('Erro ao buscar pacotes:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchTravelPackageById = createAsyncThunk(
    'travelPackages/fetchTravelPackageById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await travelPackageService.getTravelPackageById(id);
            console.log('Detalhes do pacote (antes da transformação):', response);
            const transformedResponse = transformPackageData(response);
            console.log('Detalhes do pacote transformado:', transformedResponse);
            return transformedResponse;
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
            dispatch(fetchTravelPackages());
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
            dispatch(fetchTravelPackages());
            return id;
        } catch (error) {
            console.error('Erro ao excluir pacote:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);