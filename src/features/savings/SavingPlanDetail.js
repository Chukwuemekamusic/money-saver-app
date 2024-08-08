import {  useMemo } from "react"; // useEffect,
import PaymentButtons from "../../components/PaymentButtons";
import SavingSummary from "../../components/SavingSummary";
import { date } from "../../utils/savingsUtils.js";

import { useSelector } from "react-redux";
import { setAmountList } from "../newSavingsSlice/newSavingsSlice";
import { selectSavingDetail } from "../savings/savingsSlice.js";
import { useParams } from "react-router-dom";


const SavingPlanDetail = () => {
  const { id } = useParams();
  const sData = useSelector(selectSavingDetail);
  const savingsData = useMemo(() => sData ?? [], [sData]);

  // eslint-disable-next-line
  const savings = savingsData.filter((saving) => saving.id == id)[0] ?? "";

  // #TODO I have to fix page to directly get detail from api ***Fixed!!
  // though this ensures nobody gets to the page withut using the dashboard


  const targetAmount = savings.amount;
  const { amount_list, amount, savings_name, date_created } = savings;

  return (
    <div>
      {savings && (
        <div>
          <header className="text-center">
            <h1 className="font-bold text-teal-700 text-center text-2xl md:text-3xl">
            {savings_name.toUpperCase()} SAVING PLAN
            </h1>
            {/* <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3> */}
            <h3 className="font-semibold text-gray-700 text-center text-lg md:text-2xl mb-3 px-3">
            Easy tracking: every button marks a <span className="text-lime-800-800">week's progress, </span>adding up to <span className="text-sky-700 font-bold">{savings.number_of_weeks}</span> weeks for <span className="text-sky-800 font-bold">£{amount}.</span>
            </h3>
          </header>

          <div className="block md:flex md:flex-row sm:gap-4 gap-10 justify-center">
            <div>
            <p className="text-sm pl-3 bg-white/35 md:rounded-full shadow-md w-1/4 hover:shadow-emerald-100">
                <span className="block text-teal-900 font-bold"> Date: </span>
                {date(date_created)}
              </p>
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

