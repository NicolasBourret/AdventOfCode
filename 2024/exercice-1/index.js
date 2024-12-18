import { input } from "./input.js";

const locationIds = input.match(/\d+/g);

// PART 1
const initialValue = { left: [], right: [] };

const addCurrentValue = (array) => (value) => array.push(value);
const testreducedList = locationIds.reduce(
  (accumulator, currentValue, currentId) => {
    currentId % 2
      ? addCurrentValue(accumulator.right)(currentValue)
      : addCurrentValue(accumulator.left)(currentValue);
    return accumulator;
  },
  initialValue
);

const sortedRightList = testreducedList.right.sort((a, b) => a - b);
const sortedLefttList = testreducedList.left.sort((a, b) => a - b);

const distance = sortedRightList.reduce(
  (accumulator, currentValue, currentId) =>
    Math.abs(sortedLefttList[currentId] - currentValue) + accumulator,
  0
);

console.log(distance);

// PART 2
const similariryScores = testreducedList.left.map((locationId) => {
  const occurences = testreducedList.right.filter((item) => {
    return locationId === item;
  });
  return locationId * occurences.length;
});

const similariryScore = similariryScores.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
