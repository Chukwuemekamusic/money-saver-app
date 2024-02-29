import React, { useState } from "react";
import PaymentButton from "./PaymentButton";
import { toggleSelection } from "../features/savings/savingsSlice";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";

const PaymentButtons = ({ noList }) => {
  const dispatch = useDispatch();

  // const handleButtonSelection = (index, number) => {
  //   // #TODO CREATE A BETTER MODAL COMPONENT
  //   const confirmed = window.confirm(
  //     `Are you sure you want to save £ ${number.amount} for the week?`
  //   );

  //   if (confirmed) {
  //     dispatch(toggleSelection(index))
  //   }
  // };
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [amount, setAmount] = useState(0)

  const handleButtonSelection = (index,number) => {
    setAmount(number.amount)
    setSelectedIndex(index);
    setConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(toggleSelection(selectedIndex));
    setConfirmModalOpen(false);
  };

  const handleModalClose = () => {
    setConfirmModalOpen(false);
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
       <ConfirmModal
        isOpen={isConfirmModalOpen}
        onRequestClose={handleModalClose}
        onConfirm={handleConfirm}
        amount={amount}
      />
    </div>
  );
};

export default PaymentButtons;
