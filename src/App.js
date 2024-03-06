import { useEffect, useState } from "react";
// import PaymentButtons from "./components/PaymentButtons";
// import SavingPlanForm from "./components/SavingPlanForm";
// import SavingSummary from "./components/SavingSummary";
import CreateUserForm from "./features/users/components/CreateUserForm";
import Home from "./components/HomePage";

import LoginForm from "./features/users/components/LoginForm";

import { useDispatch, useSelector } from "react-redux";
import { setNumberList } from "./features/savings/savingsSlice";
import { selectAllSavings } from "./features/savings/savingsSlice";

import { handleSetSavingsData } from "./utils/savingsUtils";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SavingPlanDetail from "./features/savings/SavingPlanDetail";

function App() {
  // const dispatch = useDispatch();
  // const numberList = useSelector((state) => state.savings.numberList);
  // const savings = useSelector(selectAllSavings);
  // const targetAmount = savings.amount || 1000;

  // const [sumNumbers, setSumNumbers] = useState(0);
  // // const targetAmount = 1000
  // const numberOfWeeks = 52;

  // useEffect(() => {
  //   handleSetSavingsData(targetAmount, numberOfWeeks, dispatch, setNumberList);
  // }, [targetAmount, dispatch]); // not sure of the dispatch dependency #TODO

  // useEffect(() => {
  //   if (numberList.length > 0) {
  //     const sums = numberList.reduce((sum, item) => sum + item.amount, 0);
  //     setSumNumbers(sums);
  //   }
  // }, [numberList]);

  return (
    <div className="app">
      {/* <header className="app-header">
        <h1>MONEY SAVING CHART</h1>
        <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3>
        {targetAmount && targetAmount !== 1000 && (
          <div>
            <h2>Target: {savings.amount}</h2>
            <span>Name: {savings.savingsName}</span>
            <p>Date: {savings.dateCreated.toLocaleString()}</p>
          </div>
        )}
      </header>
      <SavingPlanForm />

      <div className="flex-container">
        <PaymentButtons noList={numberList} setNoList={setNumberList} />
        <SavingSummary />
      </div> */}
      {/* <CreateUserForm /> */}
      <Routes>
        <Route element={<CreateUserForm />} path="/register" />
        <Route element={<LoginForm />} path="/login" />
        <Route element={<LandingPage />} path="/landing" />
        <Route element={<Home />} path="/" />
        <Route element={<SavingPlanDetail />} path="/saving_plan/" />
      </Routes>
    </div>
  );
}

export default App;
