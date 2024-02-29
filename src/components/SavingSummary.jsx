import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllSavings,
  selectAllSelectedSavings,
} from "../features/savings/savingsSlice";

const SavingSummary = () => {
  const savings = useSelector(selectAllSelectedSavings);
  return (
    <div>
      <h2>Saving Summary: </h2>
      {savings && (
        <div className="">
          {savings.map((item, index) => (
            <p key={index}>
              week {item.weekIndex}: £{item.amount}
            </p>
          ))}
          <div className="total-sum">
            <h3>Total: £{savings.reduce((sum, item) => sum + item.amount, 0)}</h3>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingSummary;
