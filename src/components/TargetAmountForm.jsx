import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTarget } from "../features/target/targetSlice";

const TargetAmountForm = () => {
  const [amount, setAmount] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setCanSubmit(!isNaN(amount) && amount !== ""); // #TODO check for float too
  }, [amount]);

  const handleSubmit= (e) => {
    e.preventDefault()
    if (canSubmit) {
        dispatch(setTarget(amount))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="target-amount">
          Target Amount:
          <input
            id="target-amount"
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            // aria-invalid={!isNaN(parseFloat(amount)) ? "false" : "true"}
          />
        </label>
        <button disabled={canSubmit ? false : true}>Submit</button>
      </form>
    </div>
  );
};

export default TargetAmountForm;
