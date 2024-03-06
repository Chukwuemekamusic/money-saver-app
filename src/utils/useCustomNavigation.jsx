import { useNavigate } from 'react-router-dom';

const useCustomNavigation = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  const navigateSavingPlanDetail = (id='') => {
    navigate(`/saving_plan/${id}`);
  }

  // Add more navigation functions as needed

  return {
    navigateHome, navigateSavingPlanDetail
    // Add other navigation functions here
  };
};

export default useCustomNavigation;
