import { useEffect, useState } from "react";
// import PaymentButtons from "./components/PaymentButtons";
// import SavingPlanForm from "./components/SavingPlanForm";
// import SavingSummary from "./components/SavingSummary";
import CreateUserForm from "./features/users/components/CreateUserForm";
import Home from "./components/HomePage";

// import LoginForm from "./features/users/components/LoginForm";
import LoginForm  from "./features/users/components/LoginForm2";

import { useDispatch, useSelector } from "react-redux";
import { setAmountList } from "./features/savings/savingsSlice";
import { selectAllSavings } from "./features/savings/savingsSlice";

import { handleSetSavingsData } from "./utils/savingsUtils";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SavingPlanDetail from "./features/savings/SavingPlanDetail";
import Navbar from "./components/Navbar";
import useCheckAuth from "./features/auth/utils/useCheckAuth";

function App() {
  // const checkAuth = useCheckAuth()
  // useEffect(() => {
  //   checkAuth()
  // }, [])
  
 

  return (
    <div className="text-gray-600 p-1 bg-gray-100 min-h-screen text-lg  bg-gradient-to-r from-indigo-200 to-teal-50 ">
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
        <PaymentButtons noList={numberList} setNoList={setAmountList} />
        <SavingSummary />
      </div> */}
      {/* <CreateUserForm /> */}
      <Navbar/>
      <Routes>
        <Route element={<CreateUserForm />} path="/register" />
        <Route element={<LoginForm />} path="/login" />
        <Route element={<LandingPage />} path="/landing" />
        <Route element={<LandingPage />} path="/landing/:id" />
        <Route element={<Home />} path="/" />
        <Route element={<SavingPlanDetail />} path="/saving_plan/:id" />
      </Routes>
    </div>
  );
}

export default App;
