import { useSelector, useDispatch } from "react-redux";
import useCheckAuth from "./features/auth/utils/useCheckAuth";
import { useEffect } from "react";
import { SelectToken, SelectUserInfo } from "./features/auth/authSlice";
import useCustomNavigation from "./utils/useCustomNavigation";
import { getUser } from "./features/auth/authActions";
import { Outlet } from "react-router-dom";
import { listSavingPlan } from "./features/savings/savingAction";

const ProtectedRouteW = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(SelectToken); //#TODO consider user local storage directly
  const userInfo = useSelector(SelectUserInfo);
  // const checkAuth = useCheckAuth()
  const { navigateLanding } = useCustomNavigation();
  useEffect(() => {
    console.log("reloaded");
    if (!userToken) {
      navigateLanding();
    } else if (userToken && !userInfo) {
      dispatch(getUser());
    }
    dispatch(listSavingPlan());
  }, [userToken, userInfo, dispatch, navigateLanding]);

  return <Outlet />; // Use Outlet instead of children
};

export default ProtectedRouteW;
