import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AppState {
    isLoading: boolean,
    productsCount: number,
    paginationPage: number,
}

const initialState: AppState = {
    isLoading: false,
    productsCount: 0,
    paginationPage: 1,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setProductsCount: (state, action: PayloadAction<number>) => {
        state.productsCount = action.payload;
    },
    setPaginationPage: (state, action: PayloadAction<number>) => {
      state.paginationPage = action.payload;
    }
  },
});

export const { setProductsCount, setPaginationPage } = appSlice.actions;

export default appSlice.reducer;
