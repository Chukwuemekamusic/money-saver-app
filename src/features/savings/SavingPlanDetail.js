import { useEffect } from "react";
import PaymentButtons from "../../components/PaymentButtons";
import SavingSummary from "../../components/SavingSummary";

import { useSelector } from "react-redux";
import { setAmountList } from "../newSavingsSlice/newSavingsSlice";
import { selectSavingDetail } from "../savings/savingsSlice.js";
import { useParams } from "react-router-dom";
import useCustomNavigation from "../../utils/useCustomNavigation.jsx";
// import useCheckAuth from "../auth/utils/useCheckAuth.js";
// import { listSavingPlan } from "./savingAction.jsx";
// import { getUser } from "../auth/authActions.js";

const SavingPlanDetail = () => {
  const { navigateHome } = useCustomNavigation();
//   const dispatch = useDispatch;
//   const checkAuth = useCheckAuth();
  const { id } = useParams();
  console.log("id", id);
  const savingsData = useSelector(selectSavingDetail) ?? [];
  console.log("savingsData", savingsData);

  const savings = savingsData.filter((saving) => saving.id == id)[0] ?? "";
  console.log("savings", savings);

  useEffect(() => {
    if (!id || savingsData === null || savingsData.length === 0 || !savings) {
      navigateHome();
    }
  }, [id, savingsData, savings]);

  const targetAmount = savings.amount;

  const { amount_list, amount, savings_name, date_created } = savings;

  const date = new Date(date_created)

  return (
    <div>
      {savings && (
        // flex flex-col items-center
        <div className=" ">
          <header className="text-center">
            <h1 className="font-bold text-teal-700 text-center text-5xl">MONEY SAVING CHART</h1>
            {/* <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3> */}
            <h3 className="font-semibold text-gray-700 text-center text-2xl" >USE THIS CHART TO SAVE AN EXTRA £{parseInt(amount)} WITHIN A YEAR</h3>
            </header>
            {targetAmount && (
              <div className="font-semibold text-xl flex items-center justify-center gap-10 p-3 bg-white rounded-full shadow-md md:w-2/4 mx-auto">
                <h2 className="italic"><span className="text-teal-900 font-bold not-italic "> Saving Plan: </span> {savings_name.toUpperCase()}</h2>
                <p className=""><span className="text-teal-900 font-bold"> Target Amount: </span>£ {amount}</p>
                {/* # TODO fix date properly */}
                <p><span className="text-teal-900 font-bold"> Date: </span>{date.toLocaleString()}</p>
              </div>
            )}
         

          <div className="flex-container">
            <PaymentButtons noList={amount_list} setNoList={setAmountList} />
            <SavingSummary amount_list={amount_list} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingPlanDetail;
