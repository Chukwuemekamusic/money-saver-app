import { configureStore } from '@reduxjs/toolkit'
import savingsReducer from '../features/savings/savingsSlice'
import newSavingsReducer from '../features/newSavingsSlice/newSavingsSlice'
// Import the new enhanced auth slice that supports both old and new auth methods
import authReducer from '../features/auth/authSliceNew'


const store = configureStore({
    reducer: {
        auth: authReducer,
        savings: savingsReducer,
        newSavings: newSavingsReducer

    }
})

export default store