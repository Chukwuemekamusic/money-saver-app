import { configureStore } from '@reduxjs/toolkit'
import savingsReducer from '../features/savings/savingsSlice'
import newSavingsReducer from '../features/newSavingsSlice/newSavingsSlice'
import authReducer from '../features/auth/authSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        savings: savingsReducer,
        newSavings: newSavingsReducer

    }
})

export default store