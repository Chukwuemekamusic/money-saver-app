// FastAPI backend URL - uses environment variable for flexibility
export const baseURL = (process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1') + '/'

// Legacy Django URLs (keeping for backward compatibility during transition)
export const regsiterURL = baseURL + 'auth/register' // Note: keeping typo for compatibility
export const loginURL = baseURL + 'auth/login'
export const googleLoginURL = baseURL + 'auth/google'
export const activateUserURL = (uidb64, token) => baseURL + `auth/activate/${uidb64}/${token}`

// Auth endpoints (handled by Supabase directly - these are for API communication)
export const syncUserURL = baseURL + 'auth/sync-user'
export const getUserURL = baseURL + 'auth/me'
export const verifyTokenURL = baseURL + 'auth/verify-token'
export const logoutUserURL = baseURL + 'auth/logout'

// Savings plan endpoints
export const createSavingPlanURL = baseURL + 'savings/plans'
export const listSavingPlanURL = baseURL + 'savings/plans'
export const savingPlanDetailURL = (id) => baseURL + `savings/plans/${id}`
export const updateSavingPlanURL = (id) => baseURL + `savings/plans/${id}`
export const deleteSavingPlanURL = (id) => baseURL + `savings/plans/${id}`

// Weekly amounts endpoints
export const updateAmountURL = (id) => baseURL + `savings/weekly-amounts/${id}`
export const selectAmountURL = (id) => baseURL + `savings/weekly-amounts/${id}/select`

// Statistics endpoint
export const getUserStatsURL = baseURL + 'savings/stats'
