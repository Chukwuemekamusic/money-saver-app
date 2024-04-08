// export const baseURL = "http://localhost:8000/api/"

export const baseURL = "https://backend-money-saver-app-production.up.railway.app/api/"

export const regsiterURL = baseURL + 'user/register/'

export const loginURL = baseURL + 'user/login/'

export const createSavingPlanURL = baseURL + 'user/savingplan/create/'

export const listSavingPlanURL = baseURL + 'user/savingplan/'

export const savingPlanDetailURL = (id) => baseURL + `user/savingplan/${id}/`

export const getUserURL = baseURL + 'user/get/'

export const logoutUserURL =  baseURL + 'user/logout-now/'

export const updateAmountURL = (id) => baseURL + `weeklyamount/update/${id}/`
