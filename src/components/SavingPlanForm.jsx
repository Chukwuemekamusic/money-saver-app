import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSavings,
  setAmountList,
} from "../features/newSavingsSlice/newSavingsSlice";
import useCustomNavigation from "../utils/useCustomNavigation";
import useSavePlan from "../features/newSavingsSlice/utils/useSavePlan";
import { handleSetSavingsData } from "../utils/savingsUtils";
import getNewPlan from "../features/newSavingsSlice/utils/getNewPlan";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomError from "./CustomError";

const SavingPlanForm = ({ onSuccess = null }) => {
  const { navigateSavingPlanDetail } = useCustomNavigation();
  const [amount, setAmount] = useState("");
  const [savingsName, setSavingsName] = useState("");
  const [duration, setDuration] = useState("52");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(""); // Add debug info display
  const dispatch = useDispatch();
  const savePlan = useSavePlan();

  const validationSchema = yup.object().shape({
    savingsName: yup.string().required("Savings name is required"),
    amount: yup.number().typeError("Amount must be a number").required("Amount is required"),
    duration: yup.number().required("Duration is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setDebugInfo("Form submitted - processing...");
    
    // Add visible debugging
    console.log('🔵 Form submitted with data:', data);
    console.log('🔵 Form state - amount:', amount, 'savingsName:', savingsName, 'duration:', duration);

    const numberOfWeeks = parseInt(duration);

    dispatch(
      setSavings({
        savingsName,
        amount,
      })
    );

    const payload = await handleSetSavingsData(
      amount,
      numberOfWeeks,
      dispatch,
      setAmountList
    );

    if (!payload) {
      setError("Failed to create saving plan. Please try again later.");
      setDebugInfo("ERROR: Failed to generate weekly amounts");
      setLoading(false);
      return;
    }
    setDebugInfo("Weekly amounts generated successfully - preparing API call...");
    setAmount("");
    setSavingsName("");

    const savingsData = {
      savings_name: savingsName,
      amount: parseFloat(amount), // Ensure it's a number
      number_of_weeks: numberOfWeeks,
      weekly_amounts: payload, // Use FastAPI-compatible field name and structure
    };

    try {
      console.log('🟢 About to save plan with data:', savingsData);
      setDebugInfo("Sending API request to create plan...");
      await savePlan(savingsData);
      console.log('🟢 Plan saved successfully!');
      setDebugInfo("Plan saved! Getting plan ID...");
      const planResult = getNewPlan();
      if (planResult && planResult.id) {
        const { id } = planResult;
        console.log('🟢 Got new plan ID:', id);
        setDebugInfo(`Success! Redirecting to plan ${id}...`);
        
        // If onSuccess callback is provided (modal context), call it
        if (onSuccess) {
          onSuccess();
        }
        
        navigateSavingPlanDetail(id);
      } else {
        console.log('🟡 Plan saved but no ID returned, staying on current page');
        setDebugInfo('Plan saved successfully!');
        
        // If onSuccess callback is provided (modal context), call it
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('🔴 Error saving plan:', error);
      setError("An error occurred while saving the plan. Please try again.");
      setDebugInfo(`ERROR: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${onSuccess ? '' : 'mx-auto w-full max-w-xs md:max-w-4xl mt-6 p-4 bg-white bg-opacity-40 shadow-md rounded-lg'} text-start`}>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label
            className="font-bold text-gray-600 mb-2"
            htmlFor="savings-name"
          >
            Savings Name:
          </label>
          <input
            type="text"
            id="savings-name"
            value={savingsName}
            {...register("savingsName")}
            onChange={(e) => {
              setError(null);
              setSavingsName(e.target.value);
            }}
            className="rounded-lg pl-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.savingsName && (<CustomError error={errors.savingsName.message} />)}
        </div>

        <div className="flex flex-col">
          <label
            className="font-bold text-gray-600 mb-2"
            htmlFor="target-amount"
          >
            Target Amount:
          </label>
          <input
            id="target-amount"
            type="text"
            value={amount}
            {...register("amount")}
            onChange={(e) => {
              setError(null);
              setAmount(e.target.value);
            }}
            className="rounded-lg pl-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.amount && (<CustomError error={errors.amount.message} />)}
        </div>
        <div className="flex flex-col">
          <label
            className="font-bold text-gray-600 mb-2"
            htmlFor="plan-duration"
          >
            Plan Duration:
          </label>
          <select
            id="plan-duration"
            value={duration}
            {...register("duration")}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-lg pl-2 py-2 bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="52" className="text-sm sm:text-base">1 Year</option>
            <option value="36" className="text-sm sm:text-base">6 Months</option>
            <option value="18" className="text-sm sm:text-base">3 Months</option>
          </select>
          {errors.duration && (<CustomError error={errors.duration.message} />)}
        </div>

        <div className="flex flex-col justify-end">
          <button
            disabled={loading}
            className={`btn bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create New Plan"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {debugInfo && <p className="text-blue-600 mt-2 text-sm">🔍 Debug: {debugInfo}</p>}
        </div>
      </form>
    </div>
  );
};

export default SavingPlanForm;