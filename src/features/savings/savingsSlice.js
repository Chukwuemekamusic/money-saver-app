import { createSlice } from "@reduxjs/toolkit";

// initialState = {
//     amount: null,
//     selected: null
// }
const initialState = {
    savingsName: null,
    amount: null,
    dateCreated: null,
    numberList: [],

}

const savingsSlice = createSlice({
    name: 'savings',
    initialState,
    reducers: {
        setNumberList: (state, action) => { state.numberList = action.payload },
        toggleSelection: (state, action) => { // #TODO do the confirmation prompt
            const index = action.payload
            state.numberList[index].selected = !state.numberList[index].selected
            // const lastWeekNo = Math.max(...state.numberList.weekNo) || 0
            const selectedWeekIndices = state.numberList.filter(
                item => item.selected
            ).map(
                item => item.weekIndex
            )
            const lastSelectedWeekIndex =
                selectedWeekIndices.length > 0
                    ? Math.max(...selectedWeekIndices)
                    : 0;
            state.numberList[index].weekIndex = lastSelectedWeekIndex + 1
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
export const selectAllSelectedSavings = (state) => (
    state.savings.numberList.filter(
        item => item.selected)).sort(
            (a, b) => a.weekIndex - b.weekIndex)

// export const selectAllSelectedSavings = (state) => {
//     const selectedSavings = state.savings.numberList.filter(item => item.selected);

//     // Sort the selected savings based on weekIndex
//     const sortedSelectedSavings = selectedSavings.slice().sort((a, b) => a.weekIndex - b.weekIndex);

//     return sortedSelectedSavings;
// };