import React from "react";
import useCustomNavigation from "../../utils/useCustomNavigation";

const SavingPlanListItem = ({ saving }) => {
  const { navigateSavingPlanDetail } = useCustomNavigation();
  const handleNavigate = () => {
    navigateSavingPlanDetail(saving.id);
  };
  return (
    <div>
      <h3
        onClick={handleNavigate}
        className="text-3xl font-bold text-sky-600 hover:text-sky-700 hover:shadow-sm cursor-pointer uppercase"
      >
        {saving.savings_name}
      </h3>
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold"> Target Amount:</span> £
        {saving.amount}
      </p>
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold"> Saved:</span> £ {saving.total_saved_amount}
      </p>
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold">Date Created:</span>{" "}
        {new Date(saving.date_created).toLocaleString()}
      </p>
      <button className="btn" onClick={handleNavigate}>
        View
      </button>
    </div>
  );
};
{
  /* {
        "id": 7,
        "user": 6, */
}
export default SavingPlanListItem;
