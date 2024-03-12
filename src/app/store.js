import { configureStore } from '@reduxjs/toolkit'
import savingsReducer from '../features/savings/savingsSlice'
import targetReducer from '../features/target/targetSlice'
import authReducer from '../features/auth/authSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        savings: savingsReducer,
        target: targetReducer,

    }
})

export default store