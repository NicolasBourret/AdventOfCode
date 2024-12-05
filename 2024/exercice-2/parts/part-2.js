const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const clearReport = (report) => report.split(" ");
const associateValues =
  (clearedReport) => (accumulator, currentValue, currentIndex) => {
    if (currentIndex !== 0 && currentIndex !== clearedReport.length - 1) {
      const associated = {
        a: clearedReport[currentIndex - 1],
        b: currentValue,
        c: clearedReport[currentIndex + 1],
      };
      return [...accumulator, associated];
    }
    return accumulator;
  };

export const safeReportsLength = (input) => {
  const reports = input.match(/[\d ]+/g);
  const logedReports = reports.map((report) => {
    const clearedReport = clearReport(report);
    const associatedValues = clearedReport.reduce(
      associateValues(clearedReport),
      []
    );
    const comparedValues = associatedValues.reduce(
      (accumulator, currentValue) => {
        const { a, b, c } = currentValue;
        const numberA = Number(a);
        const numberB = Number(b);
        const numberC = Number(c);

        const diffAB = Math.abs(Number(a) - Number(b));
        const diffBC = Math.abs(Number(a) - Number(b));

        const isBetween =
          diffAB <= 3 && diffAB >= 1 && diffBC <= 3 && diffBC >= 1;

        const isIncrease = numberA < numberB && numberB < numberC;
        const isDecrease = numberA > numberB && numberB > numberC;

        return { isIncrease, isDecrease, isBetween };
      },
      {}
    );
    console.log(comparedValues);
    return comparedValues;
  });
  return logedReports;
};
