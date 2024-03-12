import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authActions";

const userToken = localStorage.getItem('token') ?? null

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.success = true

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                state.loading = false
                state.userToken = payload.token
                localStorage.setItem('userToken', JSON.stringify(payload.token))
                state.userInfo = payload.user
                console.log('payload', payload);

            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default authSlice.reducer
export const SelectUserInfo = (state) => state.auth.userInfo
// export const SelectUserSavingPlan = (state) => state.auth.user