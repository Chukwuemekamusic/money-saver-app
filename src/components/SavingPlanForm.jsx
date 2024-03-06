import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { setTarget } from "../features/target/targetSlice";
import { setSavings } from "../features/savings/savingsSlice";
import useCustomNavigation from "../utils/useCustomNavigation";

const SavingPlanForm = () => {
  const {navigateSavingPlanDetail} = useCustomNavigation()
  const [amount, setAmount] = useState("");
  const [savingsName, setSavingsName] = useState("");
  const dispatch = useDispatch();
  const canSubmit = !isNaN(amount) && amount !== "" && savingsName !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(
        setSavings({
          savingsName,
          amount,
        })
      );
      setAmount("");
      setSavingsName("");
      navigateSavingPlanDetail() // #TODO set id
    }
  };

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
