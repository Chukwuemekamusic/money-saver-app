import React from "react";

const PaymentButton = ({ handleSelect, number, processing }) => {
  let btnStyle, buttonContent, isClickable;
  
  if (number.selected) {
    // Selected buttons - permanent, non-clickable, clean green with checkmark
    btnStyle = 'bg-green-500 text-white cursor-default shadow-md border-2 border-green-600'
    buttonContent = (
      <div className="flex items-center justify-center space-x-2">
        <span>£{number.amount}</span>
        <span className="text-lg">✓</span>
      </div>
    )
    isClickable = false
  } else if (processing) {
    // Currently being processed
    btnStyle = 'bg-blue-400 text-white cursor-wait'
    buttonContent = `£${number.amount}`
    isClickable = false
  } else {
    // Available for selection
    btnStyle = 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer transition-colors'
    buttonContent = `£${number.amount}`
    isClickable = true
  }
  
  return (
    <button
      className={`${btnStyle} rounded-md px-2 py-2 transition-colors duration-200`}
      onClick={isClickable ? handleSelect : undefined}
      disabled={!isClickable}
      title={number.selected ? `£${number.amount} - Completed` : `Click to select £${number.amount}`}
    >
      {buttonContent}
    </button>
  );
};

export default PaymentButton;
/* <div
        className="delete-button"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            this.onCancel(number.amount);
        }}
      > £{number.amount} </div> */