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

const SavingPlanForm = () => {
  const { navigateSavingPlanDetail } = useCustomNavigation();
  const [amount, setAmount] = useState("");
  const [savingsName, setSavingsName] = useState("");
  const [duration, setDuration] = useState("52");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const savePlan = useSavePlan();
  const canSubmit = !isNaN(amount) && amount !== "" && savingsName !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!canSubmit) {
      setError("Please enter a valid savings name and target amount.");
      setLoading(false);
      return;
    }
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
      setLoading(false);
      return;
    }
    setAmount("");
    setSavingsName("");

    const savingsData = {
      savings_name: savingsName,
      amount,
      amount_list: payload,
      number_of_weeks: numberOfWeeks,
    };

    try {
      await savePlan(savingsData);
      const { id } = getNewPlan();
      navigateSavingPlanDetail(id);
    } catch (error) {
      setError("An error occurred while saving the plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xs md:max-w-4xl text-start md:text-center mt-6 p-4 bg-white bg-opacity-40 shadow-md rounded-lg">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setError(null);
              setSavingsName(e.target.value);
            }}
            className="rounded-lg pl-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
            onChange={(e) => {
              setError(null);
              setAmount(e.target.value);
            }}
            className="rounded-lg pl-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-lg pl-2 py-2 bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="52" className="text-sm sm:text-base">1 Year</option>
            <option value="36" className="text-sm sm:text-base">6 Months</option>
            <option value="18" className="text-sm sm:text-base">3 Months</option>
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <button
            disabled={loading || !canSubmit}
            className={`btn bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${
              loading || !canSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create New Plan"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default SavingPlanForm;