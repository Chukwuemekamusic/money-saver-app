import { useEffect, useMemo } from "react";
import PaymentButtons from "../../components/PaymentButtons";
import SavingSummary from "../../components/SavingSummary";
import { date } from "../../utils/savingsUtils.js";

import { useSelector, useDispatch } from "react-redux";
import { setAmountList } from "../newSavingsSlice/newSavingsSlice";
import { selectAllSavings } from "../savings/savingsSlice.js";
import { getSavingPlanDetail } from "./savingAction";
import { useParams } from "react-router-dom";

const SavingPlanDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { savings: sData, isLoading } = useSelector(selectAllSavings);
  const savingsData = useMemo(() => sData ?? [], [sData]);

  // Try to find the saving plan in existing data first
  let savings = savingsData.filter((saving) => saving.id === id)[0];

  // If not found in existing data, we need to fetch it
  useEffect(() => {
    if (!savings && id) {
      dispatch(getSavingPlanDetail(id));
    }
  }, [dispatch, id, savings]);

  // Use fallback empty object if no savings data
  savings = savings || {};

  const targetAmount = savings.amount;
  const {
    weekly_amounts = [],
    amount_list = [],
    amount,
    savings_name,
    date_created,
  } = savings;

  // Use weekly_amounts from FastAPI or fallback to amount_list for legacy data
  const amounts = weekly_amounts.length > 0 ? weekly_amounts : amount_list;

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="text-xl">Loading saving plan...</div>
      </div>
    );
  }

  if (!savings || !savings.id) {
    return (
      <div className="text-center p-8">
        <div className="text-xl text-gray-600">Saving plan not found</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <header className="text-center">
          <h1 className="font-bold text-teal-700 text-center text-2xl md:text-3xl">
            {savings_name.toUpperCase()} SAVING PLAN
          </h1>
          {/* <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3> */}
          <h3 className="font-semibold text-gray-700 text-center text-lg md:text-2xl mb-3 px-3">
            Easy tracking: every button marks a{" "}
            <span className="text-lime-800-800">week's progress, </span>adding
            up to{" "}
            <span className="text-sky-700 font-bold">
              {savings.number_of_weeks}
            </span>{" "}
            weeks for <span className="text-sky-800 font-bold">£{amount}.</span>
          </h3>
        </header>

        <div className="block md:flex md:flex-row sm:gap-4 gap-10 justify-center">
          <div>
            <p className="text-sm pl-3 bg-white/35 md:rounded-full shadow-md w-1/4 hover:shadow-emerald-100">
              <span className="block text-teal-900 font-bold"> Date: </span>
              {date(date_created)}
            </p>
            <PaymentButtons noList={amounts} setNoList={setAmountList} />
          </div>

          <div>
            <SavingSummary
              amount_list={amounts}
              id={id}
              target={targetAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingPlanDetail;
