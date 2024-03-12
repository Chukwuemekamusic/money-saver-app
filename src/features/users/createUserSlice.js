import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { regsiterURL, loginURL } from "../../api/axiosUtil";

const initialState = {
    // firstName: '',
    // lastName: '',
    // email: '',
    // password: null,
    user: [],
    status: 'idle',
    error: null,
}

const fetchUser = createAsyncThunk('createUser/fetchUser', async (data) => {
    const response = await axios.get(loginURL,
        { email: data.email, password: data.password },);
    return response.data
},
)

// #TODO TO BE EDITED TO createAsyncThunk
const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { firstName, lastName, password, email } = action.payload
            state.firstName = firstName
            state.lastName = lastName
            state.password = password
            state.email = email
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default createUserSlice.reducer
export const { addUser } = createUserSlice.actions