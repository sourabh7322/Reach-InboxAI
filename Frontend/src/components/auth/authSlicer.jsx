import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,  // Updated property name
        isLoading: true,
        user: null,
    },
    reducers: {
        setAuthState: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;  // Updated property name
            state.isLoading = action.payload.isLoading;
            state.user = action.payload.user;
        }
    }
});

export const { setAuthState } = userSlice.actions;
export default userSlice.reducer;
