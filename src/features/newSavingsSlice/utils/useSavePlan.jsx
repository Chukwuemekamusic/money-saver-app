import { useDispatch, useSelector } from "react-redux";
import { SelectUserInfo } from "../../auth/authSliceNew";
import { saveSavingPlan } from "../newSavingsAction";
// import { selectNewSavings } from "../newSavingsSlice";

const useSavePlan = () => {
  const dispatch = useDispatch();
  // const {isLoading, ...newSavings} = useSelector(selectNewSavings);
  // # TODO abstract this further at the Slice level to avoid confusion in the future
  const userInfo = useSelector(SelectUserInfo);
  

  const savePlan = async (savingsData) => {
    console.log('🟡 useSavePlan received data:', savingsData);
    console.log('🟡 Current user info:', userInfo);
    // Note: No need to add user ID - FastAPI gets it from JWT token via get_current_user()
    
    await dispatch(saveSavingPlan(savingsData));
  };
  return savePlan;
};

export default useSavePlan;
