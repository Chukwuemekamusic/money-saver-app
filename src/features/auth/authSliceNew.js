import { createSlice } from "@reduxjs/toolkit";
import { 
  registerWithSupabase, 
  loginWithSupabase, 
  loginWithGoogle,
  handleAuthCallback,
  getCurrentUserProfile, 
  logoutUser,
  syncUserWithBackend,
  resetPassword,
  updatePassword
} from "./supabaseAuthActions";

// Legacy support for existing auth actions
import { registerUser, loginUser, getUser, googleLogin } from "./authActions";

const userToken = localStorage.getItem('userToken') ?? null
const userInfo = JSON.parse(localStorage.getItem('user') ?? 'null')

const initialState = {
    loading: false,
    userInfo,
    userToken,
    error: null,
    success: false,
    authMode: 'supabase', // 'supabase' or 'legacy'
    isAuthenticated: !!userToken && !!userInfo,
    passwordResetSent: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.loading = false
            state.userInfo = JSON.parse(localStorage.getItem('user') ?? null)
            state.error = null
            state.success = false
            state.userToken = localStorage.getItem('userToken') ?? null
            state.isAuthenticated = !!state.userToken
            state.passwordResetSent = false
        },
        setUser: (state, {payload}) => {
            state.loading = false
            state.userToken = payload.token
            localStorage.setItem('userToken', payload.token)
            localStorage.setItem('user', JSON.stringify(payload.user))
            state.userInfo = payload.user
            state.isAuthenticated = true
        },
        clearError: (state) => {
            state.error = null
        },
        setAuthMode: (state, {payload}) => {
            state.authMode = payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Legacy auth actions (keeping for backward compatibility)
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload.token
                localStorage.setItem('userToken', payload.token)
                localStorage.setItem('user', JSON.stringify(payload.user))
                state.userInfo = payload.user
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(googleLogin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(googleLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload.token
                state.userInfo = payload.user
                localStorage.setItem('userToken', payload.token)
                localStorage.setItem('user', JSON.stringify(payload.user))
                state.isAuthenticated = true
            })
            .addCase(googleLogin.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            // New Supabase auth actions  
            .addCase(registerWithSupabase.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(registerWithSupabase.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
                // Don't set user info until email is verified
                state.message = payload.message
            })
            .addCase(registerWithSupabase.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
                state.success = false
            })

            .addCase(loginWithSupabase.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginWithSupabase.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload.token
                state.userInfo = payload.user
                localStorage.setItem('userToken', payload.token)
                localStorage.setItem('user', JSON.stringify(payload.user))
                state.isAuthenticated = true
            })
            .addCase(loginWithSupabase.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginWithGoogle.fulfilled, (state) => {
                state.loading = false
                // OAuth redirect will handle the rest
            })
            .addCase(loginWithGoogle.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(handleAuthCallback.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(handleAuthCallback.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload.token
                state.userInfo = payload.user
                localStorage.setItem('userToken', payload.token)
                localStorage.setItem('user', JSON.stringify(payload.user))
                state.isAuthenticated = true
            })
            .addCase(handleAuthCallback.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(getCurrentUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurrentUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload
            })
            .addCase(getCurrentUserProfile.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.userToken = null
                state.userInfo = null
                state.isAuthenticated = false
                state.loading = false
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
                // Still clear auth state even if logout failed
                state.userToken = null
                state.userInfo = null
                state.isAuthenticated = false
            })

            .addCase(syncUserWithBackend.pending, (state) => {
                // Don't set loading for background sync
            })
            .addCase(syncUserWithBackend.fulfilled, (state, { payload }) => {
                // Update user info if sync was successful
                if (payload) {
                    state.userInfo = { ...state.userInfo, ...payload }
                }
            })
            .addCase(syncUserWithBackend.rejected, (state) => {
                // Background sync failure is not critical
            })

            .addCase(resetPassword.pending, (state) => {
                state.loading = true
                state.error = null
                state.passwordResetSent = false
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.passwordResetSent = true
                state.message = payload.message
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
                state.passwordResetSent = false
            })

            .addCase(updatePassword.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePassword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
                state.message = payload.message
            })
            .addCase(updatePassword.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export default authSlice.reducer
export const SelectUserInfo = (state) => state.auth.userInfo
export const SelectToken = (state) => state.auth.userToken
export const SelectIsAuthenticated = (state) => state.auth.isAuthenticated
export const SelectAuthLoading = (state) => state.auth.loading
export const SelectAuthError = (state) => state.auth.error
export const SelectPasswordResetSent = (state) => state.auth.passwordResetSent
export const { resetAuth, setUser, clearError, setAuthMode } = authSlice.actions