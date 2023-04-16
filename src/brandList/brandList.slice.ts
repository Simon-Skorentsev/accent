import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AppState {
    activeBrands: string[],
}

const initialState: AppState = {
    activeBrands: [],
};

export const brandListSlice = createSlice({
    name: 'brandListSlice',
    initialState,
    reducers: {
        switchBrand: (state, action: PayloadAction<string>) => {
            if (state.activeBrands.includes(action.payload)) {
                state.activeBrands = state.activeBrands.filter(brandId => brandId !== action.payload);
            } else {
                state.activeBrands.push(action.payload);
            }
        },
    },
});

export const { switchBrand } = brandListSlice.actions;

export default brandListSlice.reducer;
