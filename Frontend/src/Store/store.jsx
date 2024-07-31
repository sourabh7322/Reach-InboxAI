import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/auth/authSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    // Optional: add middleware and devTools configuration if needed
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // devTools: process.env.NODE_ENV !== 'production',
});
