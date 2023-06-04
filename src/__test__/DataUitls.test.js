import {
  calculateNetPercentage, calculateTaxBreakdownForYear, calculateTaxForBracket, parseTaxBracketsApiData,
} from '../utils/DataUtils';

describe(
  'DataUtils: parseTaxBracketsApiData', () => {
    test(
      'positive cases', () => {
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            min: 100,
            max: 1000,
            rate: 0.10,
          }],
        })).toEqual([{
          min: 100,
          max: 1000,
          rate: 0.10,
        }]);
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            max: 1000,
            rate: 0.10,
          }],
        })).toEqual([{
          min: 0,
          max: 1000,
          rate: 0.10,
        }]);
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            min: 1000,
            rate: 0.10,
          }],
        })).toEqual([{
          min: 1000,
          max: Infinity,
          rate: 0.10,
        }]);
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            min: -1000,
            max: 1000,
            rate: 0.10,
          }],
        })).toEqual([{
          min: 0,
          max: 1000,
          rate: 0.10,
        }]);
      },
    );
    test(
      'negative cases', () => {
        expect(parseTaxBracketsApiData({
          tax_brackets: [],
        })).toEqual([]);
        expect(parseTaxBracketsApiData({
          unknownKey: [],
        })).toEqual([]);
        expect(parseTaxBracketsApiData(null)).toEqual([]);
        expect(parseTaxBracketsApiData({
          tax_brackets: null,
        })).toEqual([]);
      },
    );
  },
);

describe(
  'DataUtils: calculateTaxForBracket', () => {
    test(
      'positive cases', () => {
        expect(calculateTaxForBracket(
          {
            min: 0,
            max: 100,
            rate: 0.10,
          }, 100,
        )).toEqual(10);
        expect(calculateTaxForBracket(
          {
            min: 100,
            max: 200,
            rate: 0.10,
          }, 200,
        )).toEqual(10);
        expect(calculateTaxForBracket(
          {
            min: 200,
            max: Infinity,
            rate: 0.20,
          }, 300,
        )).toEqual(20);
      },
    );
    test(
      'edge cases', () => {
        expect(calculateTaxForBracket(
          {
            min: 0,
            max: -100,
            rate: 0.10,
          }, 100,
        )).toEqual(-10);
        expect(calculateTaxForBracket(
          {
            min: 0,
            max: 100,
            rate: -0.10,
          }, 100,
        )).toEqual(-10);
        expect(calculateTaxForBracket(
          {
            min: 0,
            max: 100,
            rate: 0.10,
          }, 0,
        )).toEqual(0);
        expect(calculateTaxForBracket(
          null, 0,
        )).toEqual(0);
        expect(calculateTaxForBracket(
          {}, 0,
        )).toEqual(0);
        expect(calculateTaxForBracket(
          {
            min: 0,
            max: 100,
            rate: 0.10,
          }, null,
        )).toEqual(0);
        expect(calculateTaxForBracket()).toEqual(0);
        expect(calculateTaxForBracket(
          {
            min: 0,
            max: 100,
          }, null,
        )).toEqual(0);
      },
    );
  },
);

describe(
  'DataUtils: calculateTaxBreakdownForYear', () => {
    test(
      'positive cases', () => {
        expect(calculateTaxBreakdownForYear(
          [{
            min: 0,
            max: 100,
            rate: 0.10,
          }], 100,
        )).toEqual({
          breakdown: [{
            amount: 10,
            bracket: {
              min: 0,
              max: 100,
              rate: 0.10,
            },
          }],
          income: 100,
          total: 10,
        });
        expect(calculateTaxBreakdownForYear(
          [{
            min: 0,
            max: 100,
            rate: 0.10,
          }, {
            min: 100,
            max: 200,
            rate: 0.20,
          }], 200,
        )).toEqual({
          breakdown: [{
            amount: 10,
            bracket: {
              min: 0,
              max: 100,
              rate: 0.10,
            },
          }, {
            amount: 20,
            bracket: {
              min: 100,
              max: 200,
              rate: 0.20,
            },
          }],
          income: 200,
          total: 30,
        });
        expect(calculateTaxBreakdownForYear(
          [{
            min: 0,
            max: 100,
            rate: 0.10,
          }, {
            min: 100,
            max: 200,
            rate: 0.20,
          }, {
            min: 200,
            max: Infinity,
            rate: 0.30,
          }], 300,
        )).toEqual({
          breakdown: [{
            amount: 10,
            bracket: {
              min: 0,
              max: 100,
              rate: 0.10,
            },
          }, {
            amount: 20,
            bracket: {
              min: 100,
              max: 200,
              rate: 0.20,
            },
          }, {
            amount: 30,
            bracket: {
              min: 200,
              max: Infinity,
              rate: 0.30,
            },
          }],
          income: 300,
          total: 60,
        });
      },
    );
  },
);

describe(
  'DataUtils: calculateNetPercentage', () => {
    test(
      'positive cases', () => {
        expect(calculateNetPercentage(
          1000, 0,
        )).toEqual(0);
        expect(calculateNetPercentage(
          1000, 10,
        )).toEqual(1);
        expect(calculateNetPercentage(
          1000, 1000,
        )).toEqual(100);
        expect(calculateNetPercentage(
          100, 1000,
        )).toEqual(1000);
        expect(calculateNetPercentage(
          '1000', '10',
        )).toEqual(1);
        expect(calculateNetPercentage(
          '10.00', '10.00',
        )).toEqual(100);
        expect(calculateNetPercentage(
          10, 3.5,
        )).toEqual(35);
        expect(calculateNetPercentage(
          100, 3.5,
        ).toFixed(1)).toEqual('3.5');
      },
    );
    test(
      'edge cases', () => {
        expect(calculateNetPercentage(
          1000, 0,
        )).toEqual(0);
        expect(calculateNetPercentage(
          0, 1000,
        )).toEqual(0);
      },
    );
    test(
      'null cases', () => {
        expect(calculateNetPercentage()).toEqual(0);
        expect(calculateNetPercentage(
          1000, '100abc',
        )).toEqual(0);
        expect(calculateNetPercentage(
          '100abc', 100,
        )).toEqual(0);
        expect(calculateNetPercentage(
          '100abc', '100abc',
        )).toEqual(0);
        expect(calculateNetPercentage(
          null, 0,
        )).toEqual(0);
        expect(calculateNetPercentage(
          0, null,
        )).toEqual(0);
        expect(calculateNetPercentage(
          null, null,
        )).toEqual(0);
      },
    );
  },
);
