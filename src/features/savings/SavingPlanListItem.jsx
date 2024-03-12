import React from "react";

const SavingPlanListItem = ({ saving }) => {
  return (
    <div>
      <h3>{saving.savings_name}</h3>
      <p>Amount: £{saving.amount}</p>
      <p>Date Created: {new Date(saving.date_created).toLocaleString()}</p>
      <button> View </button>
    </div>
  );
};
{
  /* {
        "id": 7,
        "user": 6, */
}
export default SavingPlanListItem;
