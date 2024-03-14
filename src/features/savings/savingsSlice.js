import { createSlice } from "@reduxjs/toolkit";
import { listSavingPlan, getSavingPlanDetail } from "./savingAction";

// const initialState = {
//     savingsName: null,
//     amount: null,
//     dateCreated: null,
//     numberList: [],
//     selection_process: false

// }
const initialState = {
    isLoading: false,
    isSuccess: null,
    savings: null,
    error: null
}

// "id": 7,
//     "user": 6,
//         "savings_name": "fire on the mountain",
//             "amount": "1200.00",
//                 "date_created": "2024-03-03T22:39:42.681903Z",
//                     "amount_list": []
const savingsSlice = createSlice({
    name: 'savings',
    initialState,
    reducers: {
        setAmountList: (state, action) => { state.numberList = action.payload },
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
            state.savings.amount = action.payload.amount
            state.savings.savingsName = action.payload.savingsName
            state.savings.dateCreated = dateCreated
            state.savings.amount_list = []
        },
        // updateNumberList: (state, action) => {
        //     const { userId, planIndex, numberList } = action.payload;
        //     state[userId].savingsPlans[planIndex].numberList = numberList;
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(listSavingPlan.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(listSavingPlan.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.savings = payload
                state.isSuccess = true
                state.error = null
            })
            .addCase(listSavingPlan.rejected, (state, {payload}) => {
                state.isLoading = false
                state.savings = null
                state.error = payload
                state.isSuccess = false
            })
    }
})

export default savingsSlice.reducer
export const { setAmountList, toggleSelection, setSavings } = savingsSlice.actions
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