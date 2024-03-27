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
      {/* w-3/4 */}
      <div className="mt-5 text-start mx-auto md:w-3/4 grid md:grid-cols-2 gap-10">
        {savings.map((saving) => (
          <div className=" bg-white rounded-md border shadow-md  hover:shadow-lg hover:shadow-gray-500/50 p-3" key={saving.id}>
            <SavingPlanListItem saving={saving} />
          </div>
        ))}
      </div>
      {/* <div>{JSON.stringify(userInfo)}</div> */}
    </div>
  );
};

export default SavingPlanList;
