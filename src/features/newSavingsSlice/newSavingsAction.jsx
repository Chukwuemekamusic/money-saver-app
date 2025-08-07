import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSavingPlanURL, savingPlanDetailURL } from "../../api/axiosUtil";
import { errorCheck } from "../auth/errorCheck";
import getHeaders from "../../api/getHeaders";
import { getSupabaseToken } from "../../utils/supabase";
// import { setNewlySavedPlan } from "../savings/savingsSlice";
// import { useSelector } from "react-redux";
// import { selectNewSavings } from "./newSavingsSlice";
// import { SelectUserInfo } from "../auth/authSlice";

export const saveSavingPlan = createAsyncThunk(
  "savings/save",
  async (savingsData, thunkAPI) => {
    try {
      // Try to get Supabase token first, fallback to localStorage
      let token = await getSupabaseToken();
      if (!token) {
        token = JSON.parse(localStorage.getItem("userToken")) ?? "";
      }
      
      console.log('🟢 Creating savings plan with data:', savingsData);
      console.log('🟢 API URL:', createSavingPlanURL);
      console.log('🟢 Token available:', !!token);
      console.log('🟢 Token (first 20 chars):', token ? token.substring(0, 20) + '...' : 'null');
      console.log('🟢 Request headers:', getHeaders(token));
      
      const { data } = await axios.post(
        createSavingPlanURL,
        savingsData,
        getHeaders(token)
      );
      
      console.log('Create plan response:', data);
      localStorage.setItem("newPlanId", JSON.stringify(data.id));
      return data;
    } catch (error) {
      console.error('🔴 Create plan error:', error.response?.data || error.message);
      console.error('🔴 Error status:', error.response?.status);
      console.error('🔴 Error headers:', error.response?.headers);
      
      // Check if it's a token verification error
      if (error.response?.status === 500 && 
          error.response?.data?.detail?.includes('Token verification failed')) {
        console.log('🔴 Token verification failed - check if FastAPI backend is running and configured');
        return thunkAPI.rejectWithValue({
          message: 'Authentication error: Please make sure you are logged in.',
          type: 'AUTH_ERROR',
          canRetry: true
        });
      }
      
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

// not used***
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
