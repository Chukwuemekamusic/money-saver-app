import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { regsiterURL, loginURL, googleLoginURL, syncUserURL, getUserURL, logoutUserURL, verifyTokenURL } from "../../api/axiosUtil";
import { errorCheck } from "./errorCheck";
import getHeaders from "../../api/getHeaders";
import { resetAuth } from "./authSliceNew";
import { getSupabaseToken } from "../../utils/supabase";


export const registerUser = createAsyncThunk('auth/register',
    async ({ first_name, last_name, email, password }, thunkAPI) => {
        try {
            await axios.post(regsiterURL, { first_name, last_name, email, password })
        } catch (error) {
            return thunkAPI.rejectWithValue(errorCheck(error))
        }
    })

export const loginUser = createAsyncThunk('auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(loginURL, { email, password })
            // localStorage.setItem('userToken', data.token)
            // localStorage.setItem('userToken', JSON.stringify(data.token))
            return data
        } catch (error) {
            return rejectWithValue(errorCheck(error))
        }
    })

export const googleLogin = createAsyncThunk('auth/googleLogin',
    async ({ code }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(googleLoginURL, { code })
            return data
        } catch (error) {
            return rejectWithValue(errorCheck(error))
        }
    })

export const getUser = createAsyncThunk('auth/getUser',
    async (_, { dispatch,rejectWithValue }) => {
        try {
            // Try to get Supabase token first, fallback to localStorage
            let token = await getSupabaseToken();
            if (!token) {
                token = JSON.parse(localStorage.getItem("userToken")) ?? ""
            }
            
            const { data } = await axios.get(getUserURL, getHeaders(token))
            return data;
        } catch (error) {
            return rejectWithValue(errorCheck(error, dispatch))
        }
    })

// const removeTokenFromStorage = () => {
//     localStorage.removeItem("userToken");
// };

// Async thunk for logging out (legacy - prefer Supabase logout)
export const logoutUser = createAsyncThunk("auth/logout", async (_, {dispatch, rejectWithValue }) => {

    try {
        // Try to get Supabase token first, fallback to localStorage
        let token = await getSupabaseToken();
        if (!token) {
            token = JSON.parse(localStorage.getItem("userToken")) ?? "";
        }
        
        if (token) {
            await axios.post(logoutUserURL, {}, getHeaders(token))
        }
        
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        localStorage.removeItem("newPlanId");
        dispatch(resetAuth());
        return { success: true }

    } catch (error) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        localStorage.removeItem("newPlanId");
        return rejectWithValue(errorCheck(error))
    } finally {
        dispatch(resetAuth());
    }
});

