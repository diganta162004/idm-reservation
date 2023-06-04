import { calculateNetPercentage, parseTaxBracketsApiData } from '../utils/DataUtils';

describe(
  'DataUtils: parseTaxBracketsApiData', () => {
    test(
      'positive cases', () => {
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            min: 100,
            max: 1000,
            rate: 10,
          }],
        })).toEqual([{
          min: 100,
          max: 1000,
          rate: 10,
        }]);
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            max: 1000,
            rate: 10,
          }],
        })).toEqual([{
          min: 0,
          max: 1000,
          rate: 10,
        }]);
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            min: 1000,
            rate: 10,
          }],
        })).toEqual([{
          min: 1000,
          max: Infinity,
          rate: 10,
        }]);
        expect(parseTaxBracketsApiData({
          tax_brackets: [{
            min: -1000,
            max: 1000,
            rate: 10,
          }],
        })).toEqual([{
          min: 0,
          max: 1000,
          rate: 10,
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
