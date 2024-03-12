import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { regsiterURL, loginURL } from "../../api/axiosUtil";
import { errorCheck } from "./errorCheck";


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

    // if (error.response.data.email &&
    //     error.response.data.email[0] === "user with this email already exists.") {
    //     return thunkAPI.rejectWithValue(error.response.data.email[0])
    // } else if (error.response && error.response.data.message) {
    //     return thunkAPI.rejectWithValue(error.response.data.message)
    // } else {
    //     return thunkAPI.rejectWithValue(error.message)
    // }