import { createSlice } from "@reduxjs/toolkit";

// initialState = {
//     amount: null,
//     selected: null
// }
const initialState = {
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
        }
    }
})

export default savingsSlice.reducer
export const {setNumberList, toggleSelection} = savingsSlice.actions