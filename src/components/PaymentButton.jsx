import React from "react";

const PaymentButton = ({ handleSelect, number }) => {
  return (
    // <React.Fragment key={index}>
    <button
      className={number.selected ? "selected" : "not-selected"}
      onClick={handleSelect}
    >
      £{number.amount}
    </button>
    // </React.Fragment>
  );
};

export default PaymentButton;
