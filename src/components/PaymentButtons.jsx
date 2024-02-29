import React from "react";
import PaymentButton from "./PaymentButton";
import { toggleSelection } from "../features/savings/savingsSlice";
import { useDispatch } from "react-redux";

const PaymentButtons = ({ noList }) => {
  const dispatch = useDispatch();

  const handleButtonSelection = (index, number) => {
    // #TODO CREATE A BETTER MODAL COMPONENT
    const confirmed = window.confirm(
      `Are you sure you want to save £ ${number.amount} for the week?`
    );

    if (confirmed) {
      dispatch(toggleSelection(index))
    }
  };

  return (
    <div className="button-container">
      {noList.length ? (
        <>
          {noList.map((number, index) => (
            <PaymentButton
              key={index}
              number={number}
              handleSelect={() => handleButtonSelection(index, number)}
            />
          ))}
          <button className="last-button">Save One Box Per Week... </button>
        </>
      ) : (
        <>is Loading...</>
      )}
    </div>
  );
};

export default PaymentButtons;
