import {  useMemo } from "react"; // useEffect,
import PaymentButtons from "../../components/PaymentButtons";
import SavingSummary from "../../components/SavingSummary";
import { date } from "../../utils/savingsUtils.js";

import { useSelector } from "react-redux";
import { setAmountList } from "../newSavingsSlice/newSavingsSlice";
import { selectSavingDetail } from "../savings/savingsSlice.js";
import { useParams } from "react-router-dom";
// import useCustomNavigation from "../../utils/useCustomNavigation.jsx";
// import useCheckAuth from "../auth/utils/useCheckAuth.js";
// import { listSavingPlan } from "./savingAction.jsx";
// import { getUser } from "../auth/authActions.js";

const SavingPlanDetail = () => {
  // const { navigateHome } = useCustomNavigation();
  const { id } = useParams();
  const sData = useSelector(selectSavingDetail);
  const savingsData = useMemo(() => sData ?? [], [sData]);

  // eslint-disable-next-line
  const savings = savingsData.filter((saving) => saving.id == id)[0] ?? "";
  // console.log("savings from data", savings);

  // #TODO I have to fix page to directly get detail from api ***Fixed!!
  // though this ensures nobody gets to the page withut using the dashboard

  // useEffect(() => {
  //   if (!id || savingsData === null || savingsData.length === 0 || !savings) {
  //     navigateHome();
  //   }
  // }, [id, savingsData, savings, navigateHome]);

  const targetAmount = savings.amount;
  const { amount_list, amount, savings_name, date_created } = savings;

  return (
    <div>
      {savings && (
        // flex flex-col items-center
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

// {targetAmount && (
//   <div className=" font-semibold text-lg md:text-xl hidden md:flex flex-col md:flex-row justify-around items-start md:items-center md:gap-10 p-3 px-6 bg-white/35 md:rounded-full shadow-md w-3/4 mx-auto hover:shadow-emerald-100">
    
//     <p className="">
//       <span className="block text-teal-900 font-bold">Target: </span>
//       £{amount}
//     </p>
//     <p>
//       <span className="block text-teal-900 font-bold"> Date: </span>
//       {date(date_created)}
//     </p>
//   </div>
// )
// }
