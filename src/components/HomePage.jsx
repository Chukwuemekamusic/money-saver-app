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
  const userInfo = useSelector(SelectUserInfo);
  const checkAuth = useCheckAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth();
    dispatch(listSavingPlan());
  }, []);

  return (
    <div className="text-center">
      {isLoading ? (
        <span>is loading...</span>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl mb-4">
            Hi <span className="font-bold text-teal-700 capitalize">{userInfo?.first_name}</span>, Welcome to Your Savings Dashboard</h2>

          <SavingPlanForm />

          {/* {console.log("Savings", savings)} */}
          {error && <span>Error: {error.message}</span>}
          {savings && isSuccess && (
            <>
              <SavingPlanList savings={savings} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

// import { logoutUser } from "../features/auth/authActions";
// import useCustomNavigation from "../utils/useCustomNavigation";
// const { navigateLanding } = useCustomNavigation();
// const handleLogout = () => {
//   dispatch(logoutUser());
//   navigateLanding();
// };
// <button onClick={handleLogout}>LOG OUT</button>
//     {console.log(error)}
