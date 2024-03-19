import { useDispatch, useSelector } from "react-redux";
import { selectNewSavings } from "../newSavingsSlice";
import { SelectUserInfo } from "../../auth/authSlice";
import { saveSavingPlan } from "../newSavingsAction";

const useSavePlan = () => {
  const dispatch = useDispatch();
  // const {isLoading, ...newSavings} = useSelector(selectNewSavings);
  // # TODO abstract this further at the Slice level to avoid confusion in the future
  const userInfo = useSelector(SelectUserInfo);
  

  const savePlan = async (savingsData) => {
    // console.log('saveData', savingsData);
    const user = userInfo.id;
    const data = {
      ...savingsData,
      user,
    };
    
    await dispatch(saveSavingPlan(data));
  };
  return savePlan;
};

export default useSavePlan;
