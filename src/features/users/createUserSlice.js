import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
    password: null,
}

// #TODO TO BE EDITED TO createAsyncThunk
const createUserSlice = createSlice({
    name: createUser,
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { firstName, lastName, password } = action.payload
            state.firstName = firstName
            state.lastName = lastName,
            state.password = password
        }
    }
})