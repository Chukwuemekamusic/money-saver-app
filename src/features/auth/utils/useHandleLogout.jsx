import { useDispatch } from "react-redux";
import { logoutUser } from "../authActions";
import useCustomNavigation from "../../../utils/useCustomNavigation";

const useHandleLogout = () => {
  const { navigateLanding } = useCustomNavigation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigateLanding();
  };
  return handleLogout;
};
