import { useEffect, useState } from "react";
import PaymentButtons from "./components/PaymentButtons";
import TargetAmountForm from "./components/TargetAmountForm";
import { useDispatch, useSelector } from "react-redux";
import { setNumberList } from "./features/savings/savingsSlice";

import { generateRandomAmounts } from "./utils/savingsUtils";

function App() {
  const dispatch = useDispatch();
  const numberList = useSelector((state) => state.savings.numberList);
  
  const [sumNumbers, setSumNumbers] = useState(0);
  const target = useSelector((state) => state.target.amount)
  const targetAmount = 1000
  const numberOfWeeks = 52;

  useEffect(() => {
    const randomAmounts = generateRandomAmounts(targetAmount, numberOfWeeks);
    const payload = randomAmounts.map((number) => ({
      amount: number,
      selected: false,
    }));
    dispatch(setNumberList(payload));
  }, []);

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
        {target && <h2>Target: {target}</h2>}
      </header>
      <TargetAmountForm />

      <PaymentButtons noList={numberList} setNoList={setNumberList} />
    </div>
  );
}

export default App;
