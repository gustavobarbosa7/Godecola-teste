import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTravelPackages,
  fetchTravelPackageById,
  createTravelPackage,
  updateTravelPackageById,
  deleteTravelPackageById,
} from '../actions/travelPackagesActions';
import { logout } from './authSlice';

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
      // fetchTravelPackages
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
      // fetchTravelPackageById
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
      // createTravelPackage
      .addCase(createTravelPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTravelPackage.fulfilled, (state, _) => {
        // O parâmetro `action` não é usado, pois a lista de pacotes é atualizada
        // pelo dispatch de `fetchTravelPackages` na ação `createTravelPackage`.
        // Usamos `_` para indicar que o parâmetro é necessário pela API do Redux
        // Toolkit, mas não é utilizado aqui.
        state.loading = false;
      })
      .addCase(createTravelPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao criar pacote';
      })
      // updateTravelPackageById
      .addCase(updateTravelPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTravelPackageById.fulfilled, (state, _) => {
        // O parâmetro `action` não é usado, pois a lista de pacotes é atualizada
        // pelo dispatch de `fetchTravelPackages` na ação `updateTravelPackageById`.
        // Usamos `_` para seguir a convenção do Redux Toolkit e indicar que o
        // parâmetro é ignorado.
        state.loading = false;
      })
      .addCase(updateTravelPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao atualizar pacote';
      })
      // deleteTravelPackageById
      .addCase(deleteTravelPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTravelPackageById.fulfilled, (state, _) => {
        // O parâmetro `action` não é usado, pois a lista de pacotes é atualizada
        // pelo dispatch de `fetchTravelPackages` na ação `deleteTravelPackageById`.
        // Usamos `_` para manter a assinatura exigida pelo Redux Toolkit.
        state.loading = false;
      })
      .addCase(deleteTravelPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao excluir pacote';
      })
      // logout
      .addCase(logout, (state) => {
        state.packages = [];
        state.packageDetails = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearPackageDetails } = travelPackagesSlice.actions;
export default travelPackagesSlice.reducer;