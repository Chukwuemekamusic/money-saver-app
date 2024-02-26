import { configureStore } from '@reduxjs/toolkit'
import savingsReducer from '../features/savings/savingsSlice'


const store = configureStore({
    reducer: {
        savings: savingsReducer,
    }
})

export default store