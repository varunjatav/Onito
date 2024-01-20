// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import addressReducer from './addressSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
