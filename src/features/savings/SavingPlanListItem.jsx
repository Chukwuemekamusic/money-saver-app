import React from "react";
import useCustomNavigation from "../../utils/useCustomNavigation";
import { datetime, timeAgo } from "../../utils/savingsUtils";

const SavingPlanListItem = ({ saving }) => {
  const { navigateSavingPlanDetail } = useCustomNavigation();
  const handleNavigate = () => {
    navigateSavingPlanDetail(saving.id);
  };

  return (
    <div>
      <h3
        onClick={handleNavigate}
        className="text-xl md:text-2xl font-bold text-sky-600 hover:text-sky-7000 hover:shadow-sm cursor-pointer uppercase"
      >
        {saving.savings_name}
      </h3>
      {/* Target Amount */}
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold"> Target Amount:</span> £
        {saving.amount}
      </p>
      {/* Amount saved */}
      <p className="text-lg text-gray-700 ">
        <span className="text-sky-700 font-bold"> Saved:</span> £ {saving.total_saved_amount}
      </p>
      {/* Date Created */}
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold">Date Created:</span>{" "}
        {datetime(saving.date_created)}
      </p>
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold">Duration:</span>{" "}
        {saving?.number_of_weeks} weeks
      </p>
      <div className="flex justify-between">
      <button className="btn" onClick={handleNavigate}>
        View
      </button>
      <span className="text-sm italic bg-gray-100/90 rounded-full p-4">{timeAgo(saving.date_created)}</span>
      </div>
    </div>
  );
};
export default SavingPlanListItem;
