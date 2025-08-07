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
  const remainingAmount = target - totalSaved;
  const completedWeeks = selectedAmountList.length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg border border-blue-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Progress Tracker</h2>
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
          <span className="bg-white px-3 py-1 rounded-full shadow-sm">
            {completedWeeks} weeks completed
          </span>
          <span className="bg-white px-3 py-1 rounded-full shadow-sm">
            {percentageSaved}% saved
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <ProgressBar progress={percentageSaved} />
      </div>

      {/* Completed Weeks */}
      {selectedAmountList.length >= 1 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mr-2">✓</span>
            Completed Weeks
          </h3>
          <div className="space-y-3">
            {selectedAmountList.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 text-green-800 text-sm font-bold px-2 py-1 rounded">
                      Week {item.week_index}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {date(item.date_selected)}
                    </span>
                  </div>
                  <span className="text-green-600 font-bold text-lg">£{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">£{totalSaved}</div>
            <div className="text-sm text-gray-600">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">£{remainingAmount}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <div className="text-lg font-bold text-gray-800">Target: £{target}</div>
        </div>
      </div>

      {/* Empty State */}
      {selectedAmountList.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No weeks completed yet</h3>
          <p className="text-gray-500 text-sm">Start by clicking on an amount to select your first week!</p>
        </div>
      )}
    </div>
  );
};

export default SavingSummary;