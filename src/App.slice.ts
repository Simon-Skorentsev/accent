import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AppState {
    productsCount: number,
    paginationPage: number,
    paginationTest: boolean
}

const initialState: AppState = {
    productsCount: 0,
    paginationPage: 1,
    paginationTest: false
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
    },
    toggleTestMode: (state) => {
      state.paginationTest = !state.paginationTest;
    }
  },
});

export const { setProductsCount, setPaginationPage, toggleTestMode } = appSlice.actions;

export default appSlice.reducer;
