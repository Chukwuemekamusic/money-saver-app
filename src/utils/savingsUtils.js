// import { useDispatch, useSelector } from "react-redux";

// const numberList = useSelector((state) => state.savings.numberList);

export function generateRandomAmounts(totalAmount, numberOfWeeks) {
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

  export const handleSetSavingsData = (totalAmount, numberOfWeeks, dispatch, setAmountList) => {
    const randomAmounts = generateRandomAmounts(totalAmount, numberOfWeeks)
    const payload = randomAmounts.map((number) => ({
      amount: number,
      selected: false,
      // weekIndex: 0,
      // weekNoIndex: null, #TODO this will index the week number of the savings made.
      // payDate: null
    }));
    dispatch(setAmountList(payload));
  }

  // const payload = randomAmounts.map((number) => ({
  //   amount: number,
  //   selected: false,
  //   // weekNoIndex: null, #TODO this will index the week number of the savings made.
  //   // date: null
  // }));
  // dispatch(setAmountList(payload));
