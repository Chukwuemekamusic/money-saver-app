import React from "react";
import useCustomNavigation from "../../utils/useCustomNavigation";

const SavingPlanListItem = ({ saving }) => {
  const { navigateSavingPlanDetail } = useCustomNavigation();
  const handleNavigate = () => {
    navigateSavingPlanDetail(saving.id);
  };
  return (
    <div>
      <h3>{saving.savings_name}</h3>
      <p>Amount: £{saving.amount}</p>
      <p>Date Created: {new Date(saving.date_created).toLocaleString()}</p>
      <button onClick={handleNavigate}> View </button>
    </div>
  );
};
{
  /* {
        "id": 7,
        "user": 6, */
}
export default SavingPlanListItem;
