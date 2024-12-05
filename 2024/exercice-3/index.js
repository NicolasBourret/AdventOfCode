import fs from "fs";

fs.readFile("input.txt", (err, data) => {
  if (err) {
    throw err;
  }

  // PART 1
  const input = data.toString();

  const validsMul = input.match(/mul\(\d{1,3},\d{1,3}\)/g);

  const sum = (muls) => {
    return muls.reduce((accumulator, currentValue) => {
      const numbers = currentValue.match(/\d{1,3}/g);

      return accumulator + Number(numbers[0]) * Number(numbers[1]);
    }, 0);
  };

  // PART 2
  const validsMulP2 = input.match(/do\(\)|mul\(\d{1,3},\d{1,3}\)|don't\(\)/g);
  const initialValue = { sum: 0, shouldMultiply: true };
  const sumP2 = (muls) => {
    return muls.reduce((accumulator, currentValue) => {
      if (currentValue === "do()") {
        accumulator.shouldMultiply = true;
      }

      if (currentValue === "don't()") {
        accumulator.shouldMultiply = false;
      }

      if (
        accumulator.shouldMultiply &&
        currentValue !== "do()" &&
        currentValue !== "don't()"
      ) {
        const numbers = currentValue.match(/\d{1,3}/g);
        console.log(numbers);
        accumulator.sum =
          accumulator.sum + Number(numbers[0]) * Number(numbers[1]);
      }

      return accumulator;
    }, initialValue);
  };
});
