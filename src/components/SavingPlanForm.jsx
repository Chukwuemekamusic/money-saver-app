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
  // const numberOfWeeks = 52;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!canSubmit) {
      setError("Please enter a valid savings name and target amount.");
      setLoading(false);
      return;
    }
    const numberOfWeeks = parseInt(duration)

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
    <div className="mx-auto w-full max-w-xs md:max-w-4xl text-start md:text-center mt-6">
      <form className="" onSubmit={handleSubmit}>
        <label
          className="block md:inline font-bold text-gray-600 mr-2"
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
          className="rounded-lg pl-2"
        />

        <label
          className="inline-block md:inline font-bold text-gray-600 md:mx-2"
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
          className="rounded-lg pl-2"
          // aria-invalid={!isNaN(parseFloat(amount)) ? "false" : "true"} #TODO CHECK
        />

        <label
          className="block md:inline font-bold text-gray-600 md:mx-2"
          htmlFor="plan-duration"
        >
          Plan Duration:
        </label>
        <select
          id="plan-duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="rounded-lg pl-2"
        >
          <option value="52">1 Year</option>
          <option value="36">6 Months</option>
          <option value="18">3 Months</option>
        </select>

        <div className="sm:block md:inline-block mt-2 mx-auto text-start md:text-center">
          <button
            disabled={loading || !canSubmit}
            className={`btn sm:mx-auto md:ml-3 md:inline-block ${
              loading || !canSubmit ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create New Plan"}
          </button>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default SavingPlanForm;
