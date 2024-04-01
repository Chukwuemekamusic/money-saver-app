import { useSelector, useDispatch } from "react-redux";
import useCheckAuth from "./features/auth/utils/useCheckAuth";
import { useEffect } from "react";
import { SelectToken, SelectUserInfo } from "./features/auth/authSlice";
import useCustomNavigation from "./utils/useCustomNavigation";
import { getUser } from "./features/auth/authActions";


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
        navigateLanding()
      } else if (userToken && !userInfo) {
        console.log('bypassed2');
        dispatch(getUser)
      }
    }, [userToken, navigateLanding, userInfo, dispatch])
    


  return children
};

export default ProtectedRoute;
