import React from "react";
import { useSelector } from "react-redux";
import { selectAllSelectedSavings } from "../features/savings/savingsSlice";
import { date } from "../utils/savingsUtils";
import ProgressBar from "./ProgressBar";

const SavingSummary = ({ amount_list, target }) => {
  const selectedAmountList = amount_list
    .filter((item) => item.selected)
    .sort((a, b) => a.weekIndex - b.weekIndex);

  const totalSaved = selectedAmountList.reduce(
    (sum, item) => sum + parseInt(item.amount),
    0
  );
  const percentageSaved = Math.round((totalSaved * 100) / target, 2);
  console.log("target", target);
  console.log("percentage", percentageSaved);
  const gridPoint = selectedAmountList.length > 4;

  // console.log('savedItem', selectedAmountList);

  return (
    <div className="bg-pink-50 p-4 pr-10 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4 border-b-4 border-teal-400 text-teal-800">
        Saving Summary:{" "}
      </h2>
      {selectedAmountList.length >= 1 && (
        <div className="">
          <div
            className={`${
              gridPoint && "grid"
            } grid-cols-2 divide-x-2 divide-inherit gap-x-2`}
          >
            {selectedAmountList.map((item, index) => (
              <p key={index} className="font-semibold text-pink-700">
                {console.log("item checked", item)}
                <span className="block text-teal-900 font-bold pr-3">
                  week {item.week_index} ~ {date(item.date_selected)}:
                </span>{" "}
                £{item.amount}
              </p>
            ))}
          </div>
          <div className="total-sum border-t-4 border-teal-500 mt-3">
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
