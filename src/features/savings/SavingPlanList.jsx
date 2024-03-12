import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllSavings } from "./savingsSlice";
// import SavingPlanDetail from "./SavingPlanDetail";
// import { SelectUserInfo } from "../auth/authSlice";
import SavingPlanListItem from "./SavingPlanListItem";

const SavingPlanList = () => {
  const { savings } = useSelector(selectAllSavings);

  return (
    <div>
      <div>
        {savings.map((saving) => (
          <div key={saving.id}>
            <SavingPlanListItem saving={saving} />
          </div>
        ))}
      </div>
      {/* <div>{JSON.stringify(userInfo)}</div> */}
    </div>
  );
};

export default SavingPlanList;
