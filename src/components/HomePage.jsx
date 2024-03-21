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
import { logoutUser } from "../features/auth/authActions";
import useCustomNavigation from "../utils/useCustomNavigation";

const Home = () => {
  const { isLoading, isSuccess, savings, error } =
    useSelector(selectAllSavings);
  const userInfo = useSelector(SelectUserInfo);
  const checkAuth = useCheckAuth();
  const dispatch = useDispatch();
  const { navigateLanding } = useCustomNavigation();

  useEffect(() => {
    checkAuth();
    dispatch(listSavingPlan());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigateLanding();
  };

  return (
    <div>
      <button onClick={handleLogout}>LOG OUT</button>
      {console.log(error)}

      <h2>Hi {userInfo?.first_name}, Welcome to Your Savings Dashboard</h2>

      <SavingPlanForm />
      {isLoading && <span>is loading...</span>}
      {/* {console.log("Savings", savings)} */}
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
