import React from "react";
import SavingPlanForm from "./SavingPlanForm";
import SavingPlanList from "../features/savings/SavingPlanList";

const Home = () => {
  return (
    <div>
      <h2>Welcome to Your Savings Dashboard</h2>

      <SavingPlanForm />

      {/* Include the SavingPlanList component */}
      <SavingPlanList />
    </div>
  );
};

export default Home;
