import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savingsName: null,
    amount: null,
    dateCreated: null
    
}

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        setTarget: (state, action) => {
            // state.amount = action.payload
            const dateCreated = new Date()
            state.amount = action.payload.amount
            state.savingsName = action.payload.savingsName
            state.dateCreated = dateCreated
        }
    }
})

export default targetSlice.reducer;
export const {setTarget} = targetSlice.actions

