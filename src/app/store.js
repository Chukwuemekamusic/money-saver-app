import { configureStore } from '@reduxjs/toolkit'
import savingsReducer from '../features/savings/savingsSlice'
import targetReducer from '../features/target/targetSlice'


const store = configureStore({
    reducer: {
        savings: savingsReducer,
        target: targetReducer,
    }
})

export default store