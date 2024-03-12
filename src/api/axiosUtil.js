export const baseURL = "http://localhost:8000/api/"

export const regsiterURL = baseURL + 'user/register/'

export const loginURL = baseURL + 'user/login/'

export const createSavingPlanURL = baseURL + 'user/savingplan/create/'

export const listSavingPlanURL = baseURL + 'user/savingplan/'

export const savingPlanDetailURL = (id) => baseURL + `user/savingplan/${id}/`