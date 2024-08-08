import React from "react";
import { date } from "../utils/savingsUtils";
import ProgressBar from "./ProgressBar";

const SavingSummary = ({ amount_list, target }) => {
  const selectedAmountList = amount_list
    .filter((item) => item.selected)
    .sort((a, b) => a.week_index - b.week_index);

  const totalSaved = selectedAmountList.reduce(
    (sum, item) => sum + parseInt(item.amount),
    0
  );
  const percentageSaved = Math.round((totalSaved * 100) / target, 2);
  const gridPoint = selectedAmountList.length > 4;

  return (
    <div className="bg-pink-50 p-6 rounded-lg mt-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 border-b-4 border-teal-400 text-teal-800">
        Saving Summary
      </h2>
      {selectedAmountList.length >= 1 && (
        <div>
          <div
            className={`${
              gridPoint ? "grid grid-cols-2 gap-4" : "flex flex-col"
            } divide-x-2 divide-inherit`}
          >
            {selectedAmountList.map((item, index) => (
              <p key={index} className="font-semibold text-pink-700 mb-2">
                <span className="block text-teal-900 font-bold pr-3">
                  Week {item.week_index} ~ {date(item.date_selected)}:
                </span>
                £{item.amount}
              </p>
            ))}
          </div>
          <div className="total-sum border-t-4 border-teal-500 mt-4 pt-2">
            <h3 className="font-semibold text-pink-700">
              <span className="text-teal-900 font-bold mr-2">Total:</span> £
              {totalSaved}
            </h3>
          </div>
        </div>
      )}
      <ProgressBar progress={percentageSaved} />
    </div>
  );
};

export default SavingSummary;