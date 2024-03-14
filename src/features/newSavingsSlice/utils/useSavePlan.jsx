import { useDispatch, useSelector } from "react-redux";
import { selectNewSavings } from "../newSavingsSlice";
import { SelectUserInfo } from "../../auth/authSlice";
import { saveSavingPlan } from "../newSavingsAction";

const useSavePlan = () => {
  const dispatch = useDispatch();
  const {isLoading, ...newSavings} = useSelector(selectNewSavings);
  // # TODO abstract this further at the Slice level to avoid confusion in the future
  const userInfo = useSelector(SelectUserInfo);

  const savePlan = async () => {
    const user = userInfo.id;
    console.log('user', user);
    const savingsData = {
      ...newSavings,
      user,
    };
    await dispatch(saveSavingPlan(savingsData));
  };
  return savePlan;
};

export default useSavePlan;
