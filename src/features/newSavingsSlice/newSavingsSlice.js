import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savings_name: null,
    amount: null,
    date_created: null,
    amount_list: [],
    isLoading: false
    // selection_process: false
}

const newSavingsSlice = createSlice({
    name: 'newSavings',
    initialState,
    reducers: {
        setAmountList: (state, action) => { state.amount_list = action.payload },
        toggleSelection: (state, action) => { 
            const index = action.payload
            state.amount_list[index].selected = !state.amount_list[index].selected
            // const lastWeekNo = Math.max(...state.amount_list.weekNo) || 0
            const selectedWeekIndices = state.amount_list.filter(
                item => item.selected
            ).map(
                item => item.weekIndex
            )
            const lastSelectedWeekIndex =
                selectedWeekIndices.length > 0
                    ? Math.max(...selectedWeekIndices)
                    : 0;
            state.amount_list[index].weekIndex = lastSelectedWeekIndex + 1
        },
        setSavings: (state, action) => {
            // state.amount = action.payload
            // date_created not really needed since backend will handle this
            // const date_created = new Date()
            state.amount = action.payload.amount
            state.savings_name = action.payload.savingsName
            // state.date_created = date_created
            state.amount_list = []
        },
    },
})

export default newSavingsSlice.reducer;
export const { setSavings, setAmountList } = newSavingsSlice.actions
// export const { setAmountList, toggleSelection, setSavings } = savingsSlice.actions
export const selectNewSavings = (state) => state.newSavings
// export const selectAllSelectedSavings = (state) => (
//     state.savings.numberList.filter(
//         item => item.selected)).sort(
//             (a, b) => a.weekIndex - b.weekIndex)


// setnewSavingsTarget: (state, action) => {
//     // state.amount = action.payload
//     const date_created = new Date()
//     state.amount = action.payload.amount
//     state.savings_name = action.payload.savings_name
//     state.date_created = date_created
// },