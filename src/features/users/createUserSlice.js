import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: null,
}

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
    }
})

export default createUserSlice.reducer
export const { addUser } = createUserSlice.actions