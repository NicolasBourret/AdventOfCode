import { input } from "./input.js";
// const input = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `;

const trimValue = (value) => value.trim();
const convertInArray = (value, expression) => value.split(expression);
const convertInNumber = (value) => Number(value);
const isBetween = (a, b) => Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;
// const isIncrease = (a, b, c) => a < b && b < c;
const isIncrease = (a, b) => a < b;
// const isDecrease = (a, b, c) => a > b && b > c;
const isDecrease = (a, b) => a > b;
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

// 459 > reponse > 395
const elementIsSafe = (array, start, end) => {
  const slicedArray = array.slice(start, end);
  const [a, b, c] = slicedArray.map(convertInNumber);
  //   console.log(a, b, c);
  return (
    (isBetween(a, b) || isBetween(b, c) || isBetween(a, c)) &&
    (isIncrease(a, b, c) || isDecrease(a, b, c))
  );
};

const checkReport = (report) => {
  const levelsArray = convertInArray(report, " ").map(convertInNumber);

  // PART 1

  /**
   * 7, 6, 4, 2, 1
   * 7 est safe car:
   *  1 <= 7 - 6 <= 3 et 7 > 6 > 4
   *
   * 6 est safe car:
   *  7 > 6 > 4 et 1 <= 7 - 6 <= 3 et 1 <= 6 - 4 <= 3
   *
   * 4 est safe car:
   *  6 > 4 > 2 et 1 <= 6 - 4 <= 3 et 1 <= 4 - 2 <= 3
   *
   * 2 est safe car:
   *  4 > 2 > 1 et 1 <= 4 - 2 <= 3 et 1 <= 2 - 1 <= 3
   *
   * 1 est safe car:
   *  1 <= 2 - 1 <= 3 et 4 > 2 > 1
   */
  const inspectedLevels = levelsArray.reduce((acc, value, i) => {
    if (i === 0) {
      const a = value;
      const b = levelsArray[i + 1];
      const c = levelsArray[i + 2];
      const safe =
        ((isIncrease(a, b) && isIncrease(b, c)) ||
          (isDecrease(a, b) && isDecrease(b, c))) &&
        isBetween(a, b);

      return [...acc, safe ? "safe" : "unsafe"];
    }

    if (i === levelsArray.length - 1) {
      const a = levelsArray[i - 2];
      const b = levelsArray[i - 1];
      const c = value;
      const safe =
        ((isIncrease(a, b) && isIncrease(b, c)) ||
          (isDecrease(a, b) && isDecrease(b, c))) &&
        isBetween(b, c);

      return [...acc, safe ? "safe" : "unsafe"];
    }

    const a = levelsArray[i - 1];
    const b = value;
    const c = levelsArray[i + 1];
    const safe =
      ((isIncrease(a, b) && isIncrease(b, c)) ||
        (isDecrease(a, b) && isDecrease(b, c))) &&
      isBetween(b, c) &&
      isBetween(a, b);

    return [...acc, safe ? "safe" : "unsafe"];
  }, []);

  return inspectedLevels.includes("unsafe") ? "unsafe" : "safe";
};

const findSafeReports = (input) => {
  const arrayInput = convertInputInArray(input);
  const checkedReports = arrayInput.map(checkReport);
  const safeReports = checkedReports.filter((report) => report === "safe");

  console.log(safeReports.length);
  return safeReports.length;
};

findSafeReports(input);
