import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { listSavingPlanURL, savingPlanDetailURL, updateAmountURL, selectAmountURL } from "../../api/axiosUtil";
import { errorCheck } from "../auth/errorCheck";
import getHeaders from "../../api/getHeaders";
import { getSupabaseToken } from "../../utils/supabase";

export const listSavingPlan = createAsyncThunk(
  "savings/list",
  async (_, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem("userToken")) ?? "";
      }
      
      const { data } = await axios.get(listSavingPlanURL, getHeaders(token));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

export const getSavingPlanDetail = createAsyncThunk(
  "savings/detail",
  async (id, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem("userToken")) ?? "";
      }
      
      const { data } = await axios.get(
        savingPlanDetailURL(id),
        getHeaders(token)
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

export const updateSelectedAmount = createAsyncThunk(
  'savings/updateSelectedAmount',
  async ({ id, selected = true }, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem('userToken')) || '';
      }
      
      // Use the select endpoint for quick selection toggle
      const {data} = await axios.post(selectAmountURL(id), { selected }, getHeaders(token));
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

// New action for updating weekly amount value
export const updateWeeklyAmount = createAsyncThunk(
  'savings/updateWeeklyAmount',
  async ({ id, amount, selected }, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem('userToken')) || '';
      }
      
      const updateData = { amount, selected };
      const {data} = await axios.put(updateAmountURL(id), updateData, getHeaders(token));
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

// New action for deleting saving plan
export const deleteSavingPlan = createAsyncThunk(
  'savings/deleteSavingPlan',
  async (id, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem('userToken')) || '';
      }
      
      await axios.delete(savingPlanDetailURL(id), getHeaders(token));
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

// New action for updating saving plan
export const updateSavingPlan = createAsyncThunk(
  'savings/updateSavingPlan',
  async ({ id, planData }, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem('userToken')) || '';
      }
      
      const {data} = await axios.put(savingPlanDetailURL(id), planData, getHeaders(token));
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);