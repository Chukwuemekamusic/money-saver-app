import { useEffect, useState } from "react";
// import "./App.css";
import PaymentButtons from "./components/PaymentButtons";

function App() {
  const [numberList, setNumberList] = useState([]);
  const [sumNumbers, setSumNumbers] = useState(0);
  const [moneyList, setMoneyList] = useState([])
  // const NO_OF_WEEKS = 52

  useEffect(() => {
    function generateRandomAmounts(totalAmount, numberOfWeeks) {
      // Generate random rates for each week
      const randomRates = Array.from({ length: numberOfWeeks }, () =>
        Math.floor(Math.random() * 10 + 1)
      ); // Adjust the range of rates as needed

      // Calculate the total sum of rates
      const totalRates = randomRates.reduce((sum, rate) => sum + rate, 0);

      // Calculate amounts based on rates and round to integers
      const amounts = randomRates.map((rate) =>
        Math.round((rate / totalRates) * totalAmount)
      );

      // Adjust the last amount to ensure the total is exactly the target amount
      const adjustment =
        totalAmount - amounts.reduce((sum, amount) => sum + amount, 0);
      amounts[amounts.length - 1] += adjustment;

      return amounts;
    }

    const targetAmount = 1000;
    const numberOfWeeks = 52;

    const randomAmounts = generateRandomAmounts(targetAmount, numberOfWeeks);
    setNumberList(randomAmounts);
  }, []);

  useEffect(() => {
    if (numberList.length > 0) {
      const sums = numberList.reduce((sum, amount) => {
        return sum + amount;
      });
      setSumNumbers(sums);
    }
  }, [numberList]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MONEY SAVING CHART</h1>
        <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3>
      </header>

      <PaymentButtons noList={numberList} />
    </div>
  );
}

export default App;
