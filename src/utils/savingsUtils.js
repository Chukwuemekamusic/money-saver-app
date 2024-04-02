// import { useDispatch, useSelector } from "react-redux";

// const numberList = useSelector((state) => state.savings.numberList);
import moment from "moment";

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

export const handleSetSavingsData = async (
  totalAmount,
  numberOfWeeks,
  dispatch,
  setAmountList
) => {
  const randomAmounts = generateRandomAmounts(totalAmount, numberOfWeeks);
  const payload = randomAmounts.map((number) => ({
    amount: number,
    selected: false,
  }));
  await dispatch(setAmountList(payload));
  return payload;
};

// time related utilities
export const datetime = (date) =>
  moment(date).format("MMMM Do YYYY, h:mm:ss a");
export const time = (date) => moment(date).format("h:mm:ss a");
export const date = (date) => moment(date).format("MMMM Do YYYY");
export const timeAgo = (date) => moment(date).fromNow();

// progress bar
export const get_width = (progress) => {
  if (!progress || progress == 0) {
    return "w-[0%]"
  }
  if (progress <= 2) {
    return "w-[2%]";
  } else if (progress <= 4) {
    return "w-[4%]";
  } else if (progress <= 6) {
    return "w-[6%]";
  } else if (progress <= 8) {
    return "w-[8%]";
  } else if (progress <= 10) {
    return "w-[10%]";
  } else if (progress <= 12) {
    return "w-[12%]";
  } else if (progress <= 14) {
    return "w-[14%]";
  } else if (progress <= 16) {
    return "w-[16%]";
  } else if (progress <= 18) {
    return "w-[18%]";
  } else if (progress <= 20) {
    return "w-[20%]";
  } else if (progress <= 22) {
    return "w-[22%]";
  } else if (progress <= 24) {
    return "w-[24%]";
  } else if (progress <= 26) {
    return "w-[26%]";
  } else if (progress <= 28) {
    return "w-[28%]";
  } else if (progress <= 30) {
    return "w-[30%]";
  } else if (progress <= 32) {
    return "w-[32%]";
  } else if (progress <= 34) {
    return "w-[34%]";
  } else if (progress <= 36) {
    return "w-[36%]";
  } else if (progress <= 38) {
    return "w-[38%]";
  } else if (progress <= 40) {
    return "w-[40%]";
  } else if (progress <= 42) {
    return "w-[42%]";
  } else if (progress <= 44) {
    return "w-[44%]";
  } else if (progress <= 46) {
    return "w-[46%]";
  } else if (progress <= 48) {
    return "w-[48%]";
  } else if (progress <= 50) {
    return "w-[50%]";
  } else if (progress <= 52) {
    return "w-[52%]";
  } else if (progress <= 54) {
    return "w-[54%]";
  } else if (progress <= 56) {
    return "w-[56%]";
  } else if (progress <= 58) {
    return "w-[58%]";
  } else if (progress <= 60) {
    return "w-[60%]";
  } else if (progress <= 62) {
    return "w-[62%]";
  } else if (progress <= 64) {
    return "w-[64%]";
  } else if (progress <= 66) {
    return "w-[66%]";
  } else if (progress <= 68) {
    return "w-[68%]";
  } else if (progress <= 70) {
    return "w-[70%]";
  } else if (progress <= 72) {
    return "w-[72%]";
  } else if (progress <= 74) {
    return "w-[74%]";
  } else if (progress <= 76) {
    return "w-[76%]";
  } else if (progress <= 78) {
    return "w-[78%]";
  } else if (progress <= 80) {
    return "w-[80%]";
  } else if (progress <= 82) {
    return "w-[82%]";
  } else if (progress <= 84) {
    return "w-[84%]";
  } else if (progress <= 86) {
    return "w-[86%]";
  } else if (progress <= 88) {
    return "w-[88%]";
  } else if (progress <= 90) {
    return "w-[90%]";
  } else if (progress <= 92) {
    return "w-[92%]";
  } else if (progress <= 94) {
    return "w-[94%]";
  } else if (progress <= 96) {
    return "w-[96%]";
  } else if (progress <= 98) {
    return "w-[98%]";
  } else if (progress <= 100) {
    return "w-[100%]";
  }
};

const get_width_alt = (progress) => {
  if (progress <= 2) {
      return 'w-[2/100]' 
  } else if (progress <= 4) {
      return 'w-[4%]' 
  } else if (progress <= 10) {
      return 'w-[10%]' 
  } else if (progress <= 15) {
      return 'w-4'
  } else if (progress <= 17) {
      return 'w-1/6'
  } else if (progress <= 21) {
      return 'w-1/6'
  } else if (progress < 26) {
      return 'w-1/4'
  } else if (progress < 33) {
      return 'w-1/3'
  } else if (progress < 41) {
      return 'w-2/5'
  } else if (progress < 51) {
      return 'w-1/2'
  } else if (progress <= 60) {
      return 'w-3/5'
  } else if (progress <= 75) {
      return 'w-3/4'
  } else if (progress <= 80) {
      return 'w-4/5'
  } else if (progress <= 99) {
      return 'w-5/6'
  } else {
      return 'w-full'
  }
}
