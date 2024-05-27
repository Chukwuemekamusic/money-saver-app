import React, { useState } from "react";
import PaymentButton from "./PaymentButton";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";
import { updateSelectedAmount } from "../features/savings/savingAction";

const PaymentButtons = ({ noList }) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectionProcess, setSelectionProcess] = useState(-1);

  const handleButtonSelection = (index, number) => {
    if (!number.selected) {
      setSelectionProcess(index);
      setAmount(number.amount);
      // setSelectedIndex(index);
      setSelectedIndex(number);
      setConfirmModalOpen(true);
    }
  };

  const handleConfirm = () => {
    // dispatch(toggleSelection(selectedIndex));
    dispatch(updateSelectedAmount(selectedIndex))
    setConfirmModalOpen(false);
  };

  const handleModalClose = () => {
    setSelectionProcess(-1);
    setConfirmModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 grid grid-cols-4 md:grid-cols-7 gap-2 sm:w-full sm:max-h-[200px] md:w-[750px] md:h-[500px] mb-3">
      {noList.length ? (
        <>
          {noList.map((number, index) => (
            <PaymentButton
              key={index}
              number={number}
              handleSelect={() => handleButtonSelection(index, number)}
              processing={selectionProcess === index}
            />
          ))}
          <button className="bg-gray-400/25 hover:bg-inherit col-span-2 md:col-span-4">Save One Box Per Week... </button>
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

 // const handleButtonSelection = (index, number) => {
  //   // #TODO CREATE A BETTER MODAL COMPONENT
  //   const confirmed = window.confirm(
  //     `Are you sure you want to save £ ${number.amount} for the week?`
  //   );

  //   if (confirmed) {
  //     dispatch(toggleSelection(index))
  //   }
  // };