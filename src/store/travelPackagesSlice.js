import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTravelPackages,
  fetchTravelPackageById,
  createTravelPackage,
  updateTravelPackageById,
  deleteTravelPackageById,
} from './travelPackagesActions';

const travelPackagesSlice = createSlice({
  name: 'travelPackages',
  initialState: {
    packages: [],
    packageDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPackageDetails: (state) => {
      state.packageDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all packages
      .addCase(fetchTravelPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchTravelPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao buscar pacotes';
      })
      // Fetch package by ID
      .addCase(fetchTravelPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.packageDetails = action.payload;
      })
      .addCase(fetchTravelPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao buscar detalhes do pacote';
      })
      // Create package
      .addCase(createTravelPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTravelPackage.fulfilled, (state, action) => {
        state.loading = false;
        // A lista será atualizada por fetchTravelPackages
      })
      .addCase(createTravelPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao criar pacote';
      })
      // Update package
      .addCase(updateTravelPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTravelPackageById.fulfilled, (state, action) => {
        state.loading = false;
        // A lista será atualizada por fetchTravelPackages
      })
      .addCase(updateTravelPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao atualizar pacote';
      })
      // Delete package
      .addCase(deleteTravelPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTravelPackageById.fulfilled, (state, action) => {
        state.loading = false;
        // A lista será atualizada por fetchTravelPackages
      })
      .addCase(deleteTravelPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao excluir pacote';
      });
  },
});

export const { clearPackageDetails } = travelPackagesSlice.actions;
export default travelPackagesSlice.reducer;