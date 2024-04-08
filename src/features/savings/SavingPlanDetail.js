import { useEffect, useMemo } from "react";
import PaymentButtons from "../../components/PaymentButtons";
import SavingSummary from "../../components/SavingSummary";
import { date } from "../../utils/savingsUtils.js";

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
  const { id } = useParams();
  const sData = useSelector(selectSavingDetail);
  const savingsData = useMemo(() => sData ?? [], [sData]);

  // eslint-disable-next-line
  const savings = savingsData.filter((saving) => saving.id == id)[0] ?? "";
  // console.log("savings from data", savings);

  // #TODO I have to fix page to directly get detail from api ***Fixed!!
  // though this ensures nobody gets to the page withut using the dashboard
  useEffect(() => {
    if (!id || savingsData === null || savingsData.length === 0 || !savings) {
      navigateHome();
    }
  }, [id, savingsData, savings, navigateHome]);

  const targetAmount = savings.amount;
  const { amount_list, amount, savings_name, date_created } = savings;

  return (
    <div>
      {savings && (
        // flex flex-col items-center
        <div>
          <header className="text-center">
            <h1 className="font-bold text-teal-700 text-center text-5xl">
              MONEY SAVING CHART
            </h1>
            {/* <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3> */}
            <h3 className="font-semibold text-gray-700 text-center text-2xl">
              USE THIS CHART TO SAVE AN EXTRA £{parseInt(amount)} WITHIN A YEAR
            </h3>
          </header>
          {targetAmount && (
            <div className="font-semibold text-xl flex justify-between items-center gap-10 p-3 px-6 bg-white/35 rounded-full shadow-md md:w-3/4 mx-auto hover:shadow-emerald-100">
              <h2 className="italic">
                <span className="block text-teal-900 font-bold not-italic ">
                  {" "}
                  Saving Plan:{" "}
                </span>{" "}
                {savings_name.toUpperCase()}
              </h2>
              <p className="">
                <span className="block text-teal-900 font-bold"> Target: </span>
                £{amount}
              </p>
              {/* # TODO fix date properly */}
              <p>
                <span className="block text-teal-900 font-bold"> Date: </span>
                {date(date_created)}
              </p>
            </div>
          )}

          <div className="block md:flex md:flex-row sm:gap-4 gap-10 justify-center">
            <div>
            <PaymentButtons noList={amount_list} setNoList={setAmountList} />
            </div>
            
            <div>
            <SavingSummary
              amount_list={amount_list}
              id={id}
              target={targetAmount}
            />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingPlanDetail;
