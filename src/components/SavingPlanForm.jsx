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
  const dispatch = useDispatch();
  const savePlan = useSavePlan();
  const canSubmit = !isNaN(amount) && amount !== "" && savingsName !== "";
  const numberOfWeeks = 52;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setAmount("");
    setSavingsName("");

    const savingsData = {
      savings_name: savingsName,
      amount,
      amount_list: payload,
    };

    await savePlan(savingsData);
    // const id = JSON.parse(localStorage.getItem('newPlanId'))
    const { id } = getNewPlan();
    // console.log('new id', id);
    navigateSavingPlanDetail(id);
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
          onChange={(e) => setSavingsName(e.target.value)}
          className="rounded-lg pl-2"
        />

        <label className="inline-block md:inline font-bold text-gray-600 md:mx-2" htmlFor="target-amount">
          Target Amount:
        </label>
        <input
          id="target-amount"
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="rounded-lg pl-2"
          // aria-invalid={!isNaN(parseFloat(amount)) ? "false" : "true"} #TODO CHECK
        />
        <div className="sm:block md:inline-block mt-2 mx-auto text-start md:text-center">
        <button
          disabled={canSubmit ? false : true}
          className="btn  sm:mx-auto md:ml-3 md:inline-block"
        >
          Create New Plan
        </button>
        </div>
      </form>
    </div>
  );
};

export default SavingPlanForm;
