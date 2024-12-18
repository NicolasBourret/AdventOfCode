import { input } from "./input.js";
// const input = "()())";

// PART 1
const start = 0;
const floor = [...input].reduce((accumulator, currentValue) => {
  if (currentValue === "(") {
    ++accumulator;
  }

  if (currentValue === ")") {
    --accumulator;
  }

  return accumulator;
}, start);

// PART 2
const enterBasement = (array) => {
  console.log(array.length);
  let indexBasement = 0;
  let floor = 0;
  for (let i = 0; i <= array.length - 1; i++) {
    if (array[i] === "(") {
      floor += 1;
    }

    if (array[i] === ")") {
      floor -= 1;
    }

    if (floor === -1) {
      indexBasement = i;
      break;
    }
  }

  return indexBasement + 1;
};

console.log(enterBasement([...input]));
console.log(floor);
