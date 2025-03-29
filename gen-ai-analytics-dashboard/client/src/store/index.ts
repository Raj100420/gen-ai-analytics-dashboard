import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
