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
const convertInputInArray = (input) => {
  const trimedInput = trimValue(input);
  const inputToArray = convertInArray(trimedInput, /\n/g);
  return inputToArray;
};

const checkReport = (acc, report) => {
  const levelsArray = convertInArray(report, " ").map(convertInNumber);
  const formattedLevels = levelsArray.map((level, i) => {
    if (i === levelsArray.length - 1) {
      return levelsArray[i - 1] - level;
    }
    return level - levelsArray[i + 1];
  });
  const isSafeDecrease = formattedLevels.map((formattedLevel) => {
    if (formattedLevel >= 1 && formattedLevel <= 3 && formattedLevel !== 0) {
      return "safe";
    }
    return "unsafe";
  });
  const isSafeIncrease = formattedLevels.map((formattedLevel, i) => {
    if (formattedLevel <= -1 && formattedLevel >= -3 && formattedLevel !== 0) {
      return "safe";
    }
    return "unsafe";
  });

  // console.log(isSafeIncrease);
  // const isUnsafe =
  //   (isSafeDecrease.includes("safe") && isSafeDecrease.includes("unsafe")) ||
  //   (isSafeIncrease.includes("unsafe") && isSafeIncrease.includes("safe"));

  const isSafe =
    (!isSafeDecrease.includes("safe") && !isSafeIncrease.includes("unsafe")) ||
    (!isSafeDecrease.includes("unsafe") && !isSafeIncrease.includes("safe"));

  if (!isSafe) {
    const firstIncreaseUnsafe = isSafeIncrease.indexOf("unsafe");
    const firstDecreaseUnsafe = isSafeDecrease.indexOf("unsafe");

    console.log(
      "fuuuuuck",
      levelsArray.slice(firstIncreaseUnsafe),
      levelsArray.slice(firstDecreaseUnsafe)
    );

    return firstIncreaseUnsafe < firstDecreaseUnsafe
      ? {
          ...acc,
          unsafe: [
            ...acc.unsafe,
            levelsArray
              .slice(firstIncreaseUnsafe, firstIncreaseUnsafe + 1)
              .join(" "),
          ],
        }
      : {
          ...acc,
          unsafe: [
            ...acc.unsafe,
            levelsArray
              .slice(firstDecreaseUnsafe, firstIncreaseUnsafe + 1)
              .join(" "),
          ],
        };
  }

  // if (!isSafe) {
  //   const isUnsafeDecrease =
  //     isSafeDecrease.filter((level) => level === "unsafe").length === 1;
  //   const isUnsafeIncrease =
  //     isSafeIncrease.filter((level) => level === "unsafe").length === 1;
  //   const unsafeIndex = isSafeDecrease.indexOf("unsafe");
  //   // const checkFirst = levelsArray[unsafeIndex + 1] - levelsArray[unsafeIndex + 2]
  //   const diff = levelsArray[unsafeIndex - 1] - levelsArray[unsafeIndex + 1];

  //   // 12 10 7 8 4 [ 'safe', 'safe', 'unsafe', 'unsafe', 'unsafe' ] [ 'unsafe', 'unsafe', 'safe', 'unsafe', 'unsafe' ]
  //   if (
  //     (isUnsafeDecrease || isUnsafeIncrease) &&
  //     ((diff >= 1 && diff <= 3) || !diff)
  //   ) {
  //     // console.log(report, isSafeDecrease, isSafeIncrease);
  //     return "safe";
  //   }

  //   console.log(report, isSafeDecrease, isSafeIncrease);
  //   return "unsafe";
  // }

  // si que un unsafe dans le tableau, on check si a et c sont dans la fourchette

  // console.log(isSafeDecrease, isSafeIncrease);

  return { ...acc, safe: [...acc.safe, report] };
};

const findSafeReports = (input) => {
  const arrayInput = convertInputInArray(input);
  const { safe, unsafe } = arrayInput.reduce(checkReport, {
    safe: [],
    unsafe: [],
  });
  const becameSafe = unsafe.reduce(checkReport, {
    safe: [],
    unsafe: [],
  });

  // console.log(unsafe);
  return becameSafe.safe.length + safe.length;
};

console.log(findSafeReports(input));
