import React, { useEffect } from "react";
import SavingPlanForm from "./SavingPlanForm";
import SavingPlanList from "../features/savings/SavingPlanList";
import { useDispatch, useSelector } from "react-redux";
import {
  listSavingPlan,
  getSavingPlanDetail,
} from "../features/savings/savingAction";
import { selectAllSavings } from "../features/savings/savingsSlice";
import useCheckAuth from "../features/auth/utils/useCheckAuth";
import { SelectUserInfo } from "../features/auth/authSlice";

const Home = () => {
  const { isLoading, isSuccess, savings, error } =
    useSelector(selectAllSavings);
  const userInfo = useSelector(SelectUserInfo) ;
  const checkAuth = useCheckAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth();
    dispatch(listSavingPlan());
    
  }, []);

  return (
    <div>
      {console.log(error)}

      <h2>Hi {JSON.stringify(userInfo)}, Welcome to Your Savings Dashboard</h2>

      <SavingPlanForm />

      {/* Include the SavingPlanList component */}
      {isLoading && <span>is loading...</span>}
      {console.log("Savings", savings)}
      {error && <span>Error: {error.message}</span>}
      {savings && isSuccess && (
        <>
          <SavingPlanList savings={savings} />
        </>
      )}
    </div>
  );
};

export default Home;
