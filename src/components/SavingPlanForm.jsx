import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { setTarget } from "../features/target/targetSlice";
import {
  setSavings,
  setAmountList,
} from "../features/newSavingsSlice/newSavingsSlice";
import useCustomNavigation from "../utils/useCustomNavigation";
import useSavePlan from "../features/newSavingsSlice/utils/useSavePlan";
import { handleSetSavingsData } from "../utils/savingsUtils";

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
    // if (canSubmit) {
    await dispatch(
      setSavings({
        savingsName,
        amount,
      })
    );

    await handleSetSavingsData(amount, numberOfWeeks, dispatch, setAmountList);
    setAmount("");
    setSavingsName("");

    handleSavePlan()
    // }
  };
  const handleSavePlan = async() => {
    await savePlan();
    navigateSavingPlanDetail(); // #TODO set id
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="savings-name">Savings Name:</label>
        <input
          type="text"
          id="savings-name"
          value={savingsName}
          onChange={(e) => setSavingsName(e.target.value)}
        />

        <label htmlFor="target-amount">Target Amount:</label>
        <input
          id="target-amount"
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          // aria-invalid={!isNaN(parseFloat(amount)) ? "false" : "true"} #TODO CHECK
        />
        <button disabled={canSubmit ? false : true}>Submit</button>
      </form>
    </div>
  );
};

export default SavingPlanForm;
