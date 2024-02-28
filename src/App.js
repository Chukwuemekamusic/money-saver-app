import { useEffect, useState } from "react";
import PaymentButtons from "./components/PaymentButtons";
import TargetAmountForm from "./components/TargetAmountForm";
import CreateUserForm from "./features/users/components/CreateUserForm";
import { useDispatch, useSelector } from "react-redux";
import { setNumberList } from "./features/savings/savingsSlice";
import { selectAllSavings } from "./features/savings/savingsSlice";

import { handleSetSavingsData } from "./utils/savingsUtils";

function App() {
  const dispatch = useDispatch();
  const numberList = useSelector((state) => state.savings.numberList);  
  // const targetAmount = useSelector((state) => state.target.amount) || 1000;
  // const target = useSelector((state) => state.target)
  const savings = useSelector(selectAllSavings)
  const targetAmount = savings.amount || 1000;
  

  const [sumNumbers, setSumNumbers] = useState(0);
  // const targetAmount = 1000
  const numberOfWeeks = 52;

  useEffect(() => {
    handleSetSavingsData(targetAmount, numberOfWeeks, dispatch, setNumberList);
  }, [targetAmount, dispatch]); // not sure of the dispatch dependency #TODO

  useEffect(() => {
    if (numberList.length > 0) {
      const sums = numberList.reduce((sum, item) => sum + item.amount, 0);
      setSumNumbers(sums);
    }
  }, [numberList]);

  return (
    <div className="app">
      <header className="app-header">
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
      <TargetAmountForm />

      <PaymentButtons noList={numberList} setNoList={setNumberList} />
      <CreateUserForm />
    </div>
  );
}

export default App;
