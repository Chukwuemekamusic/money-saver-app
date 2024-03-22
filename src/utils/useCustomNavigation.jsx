import { useNavigate } from "react-router-dom";

const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateHome = () => navigate("/");

  const navigateSavingPlanDetail = (id) => navigate(`/saving_plan/${id}`);

  const navigateLanding = () => navigate("/landing");
  // Add more navigation functions as needed

  return {
    navigateHome,
    navigateSavingPlanDetail,
    navigateLanding,
    // Add other navigation functions here
  };
};

export default useCustomNavigation;
