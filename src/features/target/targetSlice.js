import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    amount: null,
    // date: null
}

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        setTarget: (state, action) => {
            // state.amount = action.payload
            state.amount = action.payload
        }
    }
})

export default targetSlice.reducer;
export const {setTarget} = targetSlice.actions

