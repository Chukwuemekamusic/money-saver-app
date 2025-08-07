import { createSlice } from "@reduxjs/toolkit";
import { listSavingPlan, updateSelectedAmount, getSavingPlanDetail, deleteSavingPlan } from "./savingAction";
import { saveSavingPlan } from "../newSavingsSlice/newSavingsAction"

const initialState = {
    isLoading: false,
    isSuccess: null,
    savings: [], // Initialize as empty array instead of null
    error: null,
    newlySavedPlan: null,
}

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
    setNewlySavedPlan: (state, action) => {
        state.newlySavedPlan = action.payload
    },
    extraReducers: builder => {
        builder
            .addCase(listSavingPlan.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(listSavingPlan.fulfilled, (state, { payload }) => {
                state.isLoading = false
                // Handle FastAPI response format which returns {plans: [...], total: ..., etc}
                state.savings = payload.plans || payload || []
                state.isSuccess = true
                state.error = null
            })
            .addCase(listSavingPlan.rejected, (state, { payload }) => {
                state.isLoading = false
                state.savings = [] // Keep as empty array instead of null
                state.error = payload
                state.isSuccess = false
            })
            // saveNewSaving
            .addCase(saveSavingPlan.pending, (state) => {
                state.isLoading = true
                state.error = null

            })
            .addCase(saveSavingPlan.fulfilled, (state, { payload }) => {
                state.isLoading = false
                // Ensure savings is an array before pushing
                if (!Array.isArray(state.savings)) {
                    state.savings = []
                }
                state.savings.push(payload)
                state.isSuccess = true
                state.error = null
                state.newlySavedPlan = payload
            })
            .addCase(saveSavingPlan.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = payload
            })
            // updateSelectedAmount
            .addCase(updateSelectedAmount.pending, (state) => {
                state.isLoading = true
                state.error = null

            })
            .addCase(updateSelectedAmount.fulfilled, (state, { payload }) => {
                state.isLoading = false
                const { saving_plan_id: savingsPlanId, id: updatedAmountId } = payload
                const savingPlan = state.savings.find(saving => saving.id === savingsPlanId)
                if (savingPlan) {
                    // Update the weekly_amounts array (FastAPI format)
                    if (savingPlan.weekly_amounts) {
                        savingPlan.weekly_amounts = savingPlan.weekly_amounts.map(amount => {
                            if (amount.id === updatedAmountId) {
                                return payload
                            }
                            return amount
                        })
                    }
                    // Also update amount_list for legacy compatibility
                    if (savingPlan.amount_list) {
                        savingPlan.amount_list = savingPlan.amount_list.map(amount => {
                            if (amount.id === updatedAmountId) {
                                return payload
                            }
                            return amount
                        })
                    }
                }
                state.isSuccess = true
                state.error = null
            })
            .addCase(updateSelectedAmount.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = payload
            })
            // getSavingPlanDetail
            .addCase(getSavingPlanDetail.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getSavingPlanDetail.fulfilled, (state, { payload }) => {
                state.isLoading = false
                // If we have existing savings, update or add the specific plan
                if (Array.isArray(state.savings)) {
                    const existingIndex = state.savings.findIndex(saving => saving.id === payload.id)
                    if (existingIndex >= 0) {
                        state.savings[existingIndex] = payload
                    } else {
                        state.savings.push(payload)
                    }
                } else {
                    state.savings = [payload]
                }
                state.isSuccess = true
                state.error = null
            })
            .addCase(getSavingPlanDetail.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = payload
            })
            // deleteSavingPlan
            .addCase(deleteSavingPlan.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(deleteSavingPlan.fulfilled, (state, { payload }) => {
                state.isLoading = false
                // Remove the deleted plan from the savings array
                state.savings = state.savings.filter(saving => saving.id !== payload.id)
                state.isSuccess = true
                state.error = null
            })
            .addCase(deleteSavingPlan.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = false
                state.error = payload
            })
    }
}
)

export default savingsSlice.reducer
export const { setAmountList, toggleSelection, setSavings, setNewlySavedPlan } = savingsSlice.actions
export const selectAllSavings = (state) => state.savings
export const selectSavingDetail = (state) => state.savings.savings
export const selectNewlySavedPlan = (state) => state.newlySavedPlan
// export const selectAllSelectedSavings = (state) => (
//     state.savings.numberList.filter(
//         item => item.selected)).sort(
//             (a, b) => a.weekIndex - b.weekIndex)

export const selectAllSelectedSavings = (state, id) => {
    const savingPlan = state.savings.find(saving => saving.id === id)
    return savingPlan.amount_list.filter(item => item.selected).sort(
        (a, b) => a.weekIndex - b.weekIndex
    )
}    

// export const selectAllSelectedSavings = (state) => {
//     const selectedSavings = state.savings.numberList.filter(item => item.selected);

//     // Sort the selected savings based on weekIndex
//     const sortedSelectedSavings = selectedSavings.slice().sort((a, b) => a.weekIndex - b.weekIndex);

//     return sortedSelectedSavings;
// };