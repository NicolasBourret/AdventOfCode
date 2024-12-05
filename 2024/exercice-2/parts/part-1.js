/**
 * 7 6 4 2 1 = Report
 * 7         = Level
 */

// const input = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `;

// Touver les reports safe

/**
 * Safe if:
 *   - All increasing (a < b)
 *   - All decreasing (a > b)
 *   - Two adjacent differ by at least one and at most three ( 1 >= a - b <= 3 )
 */
const reportsAsArray = (report) => report.split(" ");
const isIncrease = (a, b) => a < b;
const isDecrease = (a, b) => a > b;
const isBetween = (a, b) => Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;
const removeLast = (array) => array.slice(0, -1);

const compareValues = (levels) => {
  return levels.map((level, i) => {
    const a = Number(level);
    const b = Number(levels[i + 1]);

    if (isIncrease(a, b) && isBetween(a, b)) {
      return "Increase";
    }

    if (isDecrease(a, b) && isBetween(a, b)) {
      return "Decrease";
    }

    return "Not Between";
  });
};

const isSafe = (values) => {
  const comparedValues = compareValues(values);
  const clearedValues = removeLast(comparedValues);
  return !(
    (clearedValues.includes("Decrease") &&
      clearedValues.includes("Increase")) ||
    clearedValues.includes("Not Between")
  );
};

const checkReports = (reports) => {
  return reports.map((report) => {
    const arrayReports = reportsAsArray(report);
    return isSafe(arrayReports);
  });
};

export const reportsLength = (input) => {
  const reports = input.match(/[\d ]+/g);
  const checkedReports = checkReports(reports);
  const safeReports = checkedReports.filter((report) => report);

  console.log(safeReports.length);
};
