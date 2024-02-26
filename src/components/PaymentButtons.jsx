import React from "react";
import PaymentButton from "./PaymentButton";
import {
  setNumberList,
  toggleSelection,
} from "../features/savings/savingsSlice";
import { useDispatch } from "react-redux";

const PaymentButtons = ({ noList, setNoList }) => {
  const dispatch = useDispatch()

  return (
    <div className="button-container">
      {noList.map((number, index) => (
        <PaymentButton
          key={index}
          number={number}
          handleSelect={() => dispatch(toggleSelection(index))}
        />
      ))}
      <button className="last-button">Save One Box Per Week... </button>
    </div>
  );
};

export default PaymentButtons;
