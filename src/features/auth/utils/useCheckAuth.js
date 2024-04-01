import useCustomNavigation from "../../../utils/useCustomNavigation";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectUserInfo, resetAuth } from '../authSlice'
import { getUser } from "../authActions";

const useCheckAuth = () => {
  const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
  // console.log('token used:', token);
  const userInfo = useSelector(SelectUserInfo)
  const { navigateLanding } = useCustomNavigation();
  const dispatch = useDispatch()

  // const checkAuth = useCallback(() => {
  //   if (!token) {
  //     navigateLanding();
  //   }
  // }, [token, navigateLanding]);

  const checkAuth = async () => {
    if (!token) {
      // dispatch(resetAuth)
      navigateLanding();
    }
    else if (token && !userInfo) {
      dispatch(getUser())
    }
  };
  // #TODO CLEAR THE USER IF NO TOKEN IS AVAILABLE

  return checkAuth;

};
export default useCheckAuth;

