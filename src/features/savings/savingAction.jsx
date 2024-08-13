import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { listSavingPlanURL, savingPlanDetailURL, updateAmountURL } from "../../api/axiosUtil";
import { errorCheck } from "../auth/errorCheck";
import getHeaders from "../../api/getHeaders";

export const listSavingPlan = createAsyncThunk(
  "savings/list",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
      // console.log("token used", token);
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
      const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
      // console.log("token used", token);
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
  async ({ id }, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem('userToken')) || '';
      const sendData = {selected: true}
      const {data} = await axios.patch(updateAmountURL(id), sendData, getHeaders(token));
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);