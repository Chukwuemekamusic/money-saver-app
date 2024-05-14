import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSavingPlanURL, savingPlanDetailURL } from "../../api/axiosUtil";
import { errorCheck } from "../auth/errorCheck";
import getHeaders from "../../api/getHeaders";
// import { setNewlySavedPlan } from "../savings/savingsSlice";
// import { useSelector } from "react-redux";
// import { selectNewSavings } from "./newSavingsSlice";
// import { SelectUserInfo } from "../auth/authSlice";

export const saveSavingPlan = createAsyncThunk(
  "savings/save",
  async (savingsData, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
      // console.log("token used", token);
      const { data } = await axios.post(
        createSavingPlanURL,
        savingsData,
        getHeaders(token)
      );
      localStorage.setItem("newPlanId", JSON.stringify(data.id));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(errorCheck(error));
    }
  }
);

// not used***
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
