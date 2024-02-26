import React from "react";
import PaymentButton from "./PaymentButton";

const PaymentButtons = ({ noList, setNoList }) => {
  const handleSelected = (index) => {
    setNoList((prev) => {
      const newList = [...prev];
      newList[index].selected = !newList[index].selected;
      return newList;
    });
  };

  return (
    <div className="button-container">
      {noList.map((number, index) => (
        // <React.Fragment key={index}>
        //   <button className={number.selected ? "selected" : "not-selected"}
        //   onClick={() => handleSelected(index)}>
        //     £{number.amount}
        //   </button>
        // </React.Fragment>
        <PaymentButton
          key={index}
          number={number}
          handleSelect={() => handleSelected(index)}
        />
      ))}
      <button className="last-button">Save One Box Per Week... </button>
    </div>
  );
};

export default PaymentButtons;
