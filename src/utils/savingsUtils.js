
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
