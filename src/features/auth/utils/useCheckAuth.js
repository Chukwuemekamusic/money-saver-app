import useCustomNavigation from "../../../utils/useCustomNavigation";
import { useCallback } from "react";

const useCheckAuth = () => {
  const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
  // console.log('token used:', token);
  const { navigateLanding } = useCustomNavigation();

  // const checkAuth = useCallback(() => {
  //   if (!token) {
  //     navigateLanding();
  //   }
  // }, [token, navigateLanding]);
  
  const checkAuth = () => {
    if (!token) {
      navigateLanding();
    }
  };
// #TODO CLEAR THE USER IF NO TOKEN IS AVAILABLE

  return checkAuth;
  
};
export default useCheckAuth;
