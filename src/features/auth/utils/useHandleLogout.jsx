import { useDispatch } from "react-redux";
import { logoutUser as legacyLogoutUser } from "../authActions";
import { logoutUser as supabaseLogoutUser } from "../supabaseAuthActions";
import useCustomNavigation from "../../../utils/useCustomNavigation";

const useHandleLogout = () => {
  const { navigateLanding } = useCustomNavigation();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      // Try Supabase logout first (preferred)
      await dispatch(supabaseLogoutUser()).unwrap();
    } catch (error) {
      console.log('Supabase logout failed, trying legacy logout:', error);
      // Fallback to legacy logout
      dispatch(legacyLogoutUser());
    } finally {
      navigateLanding();
    }
  };
  return handleLogout;
};

export default useHandleLogout
