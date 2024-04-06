import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUser, logoutUser } from "./authActions";

const userToken = localStorage.getItem('userToken') ?? null

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
    reducers: {
        resetAuth: (state) => {
            state.loading = false
            state.userInfo = null
            state.error = null
            state.success = false
            state.userToken = localStorage.getItem('userToken') ?? null
            
        },
    },
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
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload.token
                localStorage.setItem('userToken', JSON.stringify(payload.token))
                state.userInfo = payload.user
                // console.log('payload', payload);

            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            // get User
            .addCase(getUser.pending, (state) => {
                state.loading = true
                // state.error = null
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
                // state.userToken 

            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(logoutUser.fulfilled, (state, { payload }) => {
                console.log('payload', payload);
                console.log('userInfo', state.userInfo);
                state.userToken = localStorage.getItem('userToken') ?? null
                state.userInfo = null
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
                state.userToken = localStorage.getItem('userToken') ?? null
            })
    }
})

export default authSlice.reducer
export const SelectUserInfo = (state) => state.auth.userInfo
export const SelectToken = (state) => state.auth.userToken
export const { resetAuth } = authSlice.actions
// export const SelectUserSavingPlan = (state) => state.auth.user