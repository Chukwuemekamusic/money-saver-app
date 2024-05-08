import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SelectToken, SelectUserInfo, resetAuth } from "./features/auth/authSlice";
import useCustomNavigation from "./utils/useCustomNavigation";
import { getUser } from "./features/auth/authActions";
import { Outlet } from "react-router-dom";
import { listSavingPlan } from "./features/savings/savingAction";
// import useCheckAuth from "./features/auth/utils/useCheckAuth";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch()
    const userToken = useSelector(SelectToken) //#TODO consider user local storage directly
    const userInfo = useSelector(SelectUserInfo)
    // const checkAuth = useCheckAuth()
    const {navigateLanding} = useCustomNavigation()
    useEffect(() => {
        console.log('reloaded');
      if (userToken === null) {
        console.log('bypassed1');
        dispatch(resetAuth())
        navigateLanding()
      } else if (userToken && !userInfo) {
        console.log('bypassed2');
        dispatch(getUser)
      }
      dispatch(listSavingPlan());
      // eslint-disable-next-line
    }, [])
    // userInfo, dispatch, navigateLanding, userToken
    


  return children ? children : <Outlet />
};

export default ProtectedRoute;
