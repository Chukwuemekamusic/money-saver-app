// export const baseURL = "http://localhost:8000/api/"

// export const baseURL = process.env.BACKENDURL
export const baseURL = 'https://backend-money-saver-app-production.up.railway.app/api/'

export const regsiterURL = baseURL + 'user/register-auth/'

export const loginURL = baseURL + 'user/login/'

export const googleLoginURL = baseURL + 'user/login/google/'

export const createSavingPlanURL = baseURL + 'user/savingplan/create/'

export const listSavingPlanURL = baseURL + 'user/savingplan/'

export const savingPlanDetailURL = (id) => baseURL + `user/savingplan/${id}/`

export const getUserURL = baseURL + 'user/get/'

export const logoutUserURL =  baseURL + 'user/logout-now/'

export const activateUserURL = (uidb64, token) => baseURL + `user/activate/${uidb64}/${token}/`


export const updateAmountURL = (id) => baseURL + `weeklyamount/update/${id}/`
