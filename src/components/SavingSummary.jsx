import React from "react";
import { useSelector } from "react-redux";
import { selectAllSelectedSavings } from "../features/savings/savingsSlice";

const SavingSummary = ({ amount_list}) => {
  // const amount_list = useSelector(selectAllSelectedSavings(savingPlanId));
  // const selectedAmountList = () => {
  //   return amount_list
  //     .filter((item) => item.selected)
  //     .sort((a, b) => a.weekIndex - b.weekIndex);
  // };
  const selectedAmountList = amount_list
    .filter((item) => item.selected)
    .sort((a, b) => a.weekIndex - b.weekIndex);

  console.log('item', selectedAmountList);

  return (
    <div>
      <h2>Saving Summary: </h2>
      {amount_list && (
        <div className="">
          {selectedAmountList.map((item, index) => (
            <p key={index}>
              week {item.week_index}: £{item.amount}
        
            </p>
          ))}
          <div className="total-sum">
            <h3>
              Total: £{selectedAmountList.reduce((sum, item) => sum + parseInt(item.amount), 0)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingSummary;
