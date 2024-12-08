// import { input } from "./input.js";
const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const trimValue = (value) => value.trim();
const convertInArray = (value, expression) => value.split(expression);
const convertInNumber = (value) => Number(value);
const isBetween = (a, b) => Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;
const isIncrease = (a, b, c) => a < b && b < c;
const isDecrease = (a, b, c) => a > b && b > c;
const convertInputInArray = (input) => {
  const trimedInput = trimValue(input);
  const inputToArray = convertInArray(trimedInput, /\n/g);

  return inputToArray;
};

// const elementIsSafe = (array, start, end) => {
//   const slicedArray = array.slice(start, end);
//   const [a, b, c] = slicedArray.map(convertInNumber);
//   return (
//     isBetween(a, b) &&
//     isBetween(b, c) &&
//     (isIncrease(a, b, c) || isDecrease(a, b, c))
//   );
// };
const elementIsSafe = (array, start, end) => {
  const slicedArray = array.slice(start, end);
  const [a, b, c] = slicedArray.map(convertInNumber);
  return (
    isBetween(a, b) &&
    isBetween(b, c) &&
    (isIncrease(a, b, c) || isDecrease(a, b, c))
  );
};

const checkReport = (report) => {
  const levelsArray = convertInArray(report, " ");

  const inspectedLevels = levelsArray.reduce(
    (accumulator, currentValue, currentIndex) => {
      if (currentIndex === 0) {
        accumulator = [
          ...accumulator,
          elementIsSafe(levelsArray, currentIndex, currentIndex + 3)
            ? "safe"
            : "unsafe",
        ];

        return accumulator;
      }

      if (currentIndex === levelsArray.length - 1) {
        accumulator = [
          ...accumulator,
          elementIsSafe(levelsArray, currentIndex - 2) ? "safe" : "unsafe",
        ];

        return accumulator;
      }

      accumulator = [
        ...accumulator,
        elementIsSafe(levelsArray, currentIndex - 1, currentIndex + 2)
          ? "safe"
          : "unsafe",
      ];

      return accumulator;
    },
    []
  );
  //   console.log(inspectedLevels);

  //   const unsafedElements = levelsArray.filter(
  //     (level, i) => inspectedLevels[i] === "unsafe"
  //   );

  //   console.log(unsafedElements);

  return inspectedLevels.includes("unsafe") ? "unsafe" : "safe";
};

const findSafeReports = (input) => {
  const arrayInput = convertInputInArray(input);
  const checkedReports = arrayInput.map(checkReport);
  const safeReports = checkedReports.filter((report) => report === "safe");

  console.log(checkedReports);
  return safeReports.length;
};

findSafeReports(input);
