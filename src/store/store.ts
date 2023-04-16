
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from "../api/api";
import brandListSlice from "../brandList/brandList.slice";
import appSlice from "../App.slice";
import cartSlice from "../pages/cart/card.slice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    brandListSlice,
    appSlice,
    cartSlice,
  },
  middleware: (getDefailtMiddleware) =>
    getDefailtMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

