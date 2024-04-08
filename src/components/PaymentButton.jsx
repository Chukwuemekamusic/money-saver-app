import React from "react";

const PaymentButton = ({ handleSelect, number, processing }) => {
  let btnStyle;
  if (number.selected){
    btnStyle = 'bg-pink-300 hover:cursor-not-allowed hover:bg-pink-300'
  } else if (processing) {
    btnStyle = 'bg-blue-400'
  } else {
    btnStyle = 'bg-gray-400'
  }
  
  return (
    <>
      <button
        // className={number.selected ? "selected" : "not-selected"}
        className={`${btnStyle} rounded-md`}
        onClick={handleSelect}
      >
        £{number.amount}
      </button>
      
    </>
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