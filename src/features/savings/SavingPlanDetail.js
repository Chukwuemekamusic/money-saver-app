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
    // console.log("ignored");
  }, [id, savingsData, savings]);

  const targetAmount = savings.amount;

  const { amount_list, amount, savings_name, date_created } = savings;

  const date = new Date(date_created)

  return (
    <div>
      {savings && (
        <div>
          <header className="app-header">
            <h1>MONEY SAVING CHART</h1>
            {/* <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3> */}
            <h3>USE THIS CHART TO SAVE AN EXTRA £{parseInt(amount)} IN 2024</h3>
            {targetAmount && (
              <div>
                <h2>Saving Plan: {savings_name}</h2>
                <span>Target: £ {amount}</span>
                {/* # TODO fix date properly */}
                <p>Date: {date.toLocaleString()}</p>
              </div>
            )}
          </header>

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
