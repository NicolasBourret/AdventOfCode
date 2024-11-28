import { input } from "./input.js";

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
