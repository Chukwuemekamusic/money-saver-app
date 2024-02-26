import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTarget } from "../features/target/targetSlice";

const TargetAmountForm = () => {
  const [amount, setAmount] = useState("");
  const [savingsName, setSavingsName] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCanSubmit(!isNaN(amount) && amount !== "" && savingsName !== ""); // #TODO check for float too
  }, [amount, savingsName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(
        setTarget({
          savingsName,
          amount,
        })
      );
      setAmount('')
      setSavingsName('')
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="savings-name">
          Savings Name:
          <input
            type="text"
            id="savings-name"
            value={savingsName}
            onChange={(e) => setSavingsName(e.target.value)}
          />
        </label>
        <label htmlFor="target-amount">
          Target Amount:
          <input
            id="target-amount"
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            // aria-invalid={!isNaN(parseFloat(amount)) ? "false" : "true"} #TODO CHECK
          />
        </label>
        <button disabled={canSubmit ? false : true}>Submit</button>
      </form>
    </div>
  );
};

export default TargetAmountForm;
