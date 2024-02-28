import { createSlice } from "@reduxjs/toolkit";

// initialState = {
//     amount: null,
//     selected: null
// }
const initialState = {
    savingsName: null,
    amount: null,
    dateCreated: null,
    numberList: []
}

const savingsSlice = createSlice({
    name: 'savings',
    initialState,
    reducers: {
        setNumberList: (state, action) => { state.numberList = action.payload },
        toggleSelection: (state, action) => {
            const index = action.payload
            state.numberList[index].selected = !state.numberList[index].selected
        },
        setSavings: (state, action) => {
            // state.amount = action.payload
            const dateCreated = new Date()
            state.amount = action.payload.amount
            state.savingsName = action.payload.savingsName
            state.dateCreated = dateCreated
        },
        // updateNumberList: (state, action) => {
        //     const { userId, planIndex, numberList } = action.payload;
        //     state[userId].savingsPlans[planIndex].numberList = numberList;
        // },
    }
})

export default savingsSlice.reducer
export const { setNumberList, toggleSelection, setSavings } = savingsSlice.actions
export const selectAllSavings = (state) => state.savings