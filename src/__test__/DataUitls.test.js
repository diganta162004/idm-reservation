import { calculateNetPercentage } from '../utils/DataUtils';

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
