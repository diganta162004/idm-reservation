import {
  toFixedDecimalPlaces, isANumber, formatCurrency,
} from '../../src/utils/NumberUtils';

describe(
  'NumberUtils: isANumber', () => {
    test(
      'positive cases', () => {
        expect(isANumber(100)).toEqual(true);
        expect(isANumber('100')).toEqual(true);
        expect(isANumber(0)).toEqual(true);
        expect(isANumber(-0)).toEqual(true);
        expect(isANumber('100.02312')).toEqual(true);
        expect(isANumber(100.35)).toEqual(true);
        expect(isANumber(-100)).toEqual(true);
        expect(isANumber(-100.35)).toEqual(true);
        expect(isANumber(10.000)).toEqual(true);
        expect(isANumber(0.001)).toEqual(true);
        expect(isANumber(0.00)).toEqual(true);
        expect(isANumber(Infinity)).toEqual(true);
        expect(isANumber(-Infinity)).toEqual(true);
      },
    );
    test(
      'negative cases', () => {
        expect(isANumber(null)).toEqual(false);
        expect(isANumber(undefined)).toEqual(false);
        expect(isANumber()).toEqual(false);
        expect(isANumber('abc')).toEqual(false);
        expect(isANumber('a100.123')).toEqual(false);
        expect(isANumber('100.12a3')).toEqual(false);
        expect(isANumber('100.123a')).toEqual(false);
        expect(isANumber('100.12.12')).toEqual(false);
        expect(isANumber(false)).toEqual(false);
        expect(isANumber(true)).toEqual(false);
        expect(isANumber('0000.001')).toEqual(false);
      },
    );
  },
);

describe(
  'NumberUtils: toFixedDecimalPlaces', () => {
    test(
      'positive cases', () => {
        expect(toFixedDecimalPlaces(
          100, 0,
        )).toEqual('100');
        expect(toFixedDecimalPlaces(
          100.123, 2,
        )).toEqual('100.12');
        expect(toFixedDecimalPlaces(
          100.123, 1,
        )).toEqual('100.1');
        expect(toFixedDecimalPlaces(
          100.126, 2,
        )).toEqual('100.13');
        expect(toFixedDecimalPlaces(
          100, 2,
        )).toEqual('100.00');
        expect(toFixedDecimalPlaces(
          '100.123', 2,
        )).toEqual('100.12');
        expect(toFixedDecimalPlaces(
          0, 2,
        )).toEqual('0.00');
        expect(toFixedDecimalPlaces(
          '0', 2,
        )).toEqual('0.00');
      },
    );
    test(
      'negative cases', () => {
        expect(toFixedDecimalPlaces(
          null, 0,
        )).toEqual(null);
        expect(toFixedDecimalPlaces(
          undefined, 0,
        )).toEqual(undefined);
        expect(toFixedDecimalPlaces(
          'abc', 0,
        )).toEqual('abc');
        expect(toFixedDecimalPlaces(
          {
            key: 'value',
          }, 0,
        )).toEqual({
          key: 'value',
        });
        expect(toFixedDecimalPlaces(
          '000000', 2,
        )).toEqual('000000');
        expect(toFixedDecimalPlaces()).toEqual(undefined);
      },
    );
  },
);

describe(
  'NumberUtils: formatCurrency', () => {
    test(
      'positive cases', () => {
        expect(formatCurrency(
          0, 0,
        )).toEqual('0');
        expect(formatCurrency(
          1000, 0,
        )).toEqual('1,000');
        expect(formatCurrency(
          100000, 0,
        )).toEqual('100,000');
        expect(formatCurrency(
          1000000, 0,
        )).toEqual('1,000,000');

        expect(formatCurrency(
          '0', 0,
        )).toEqual('0');
        expect(formatCurrency(
          '1000', 0,
        )).toEqual('1,000');
        expect(formatCurrency(
          '100000', 0,
        )).toEqual('100,000');
        expect(formatCurrency(
          '1000000', 0,
        )).toEqual('1,000,000');

        expect(formatCurrency(
          1000, 2,
        )).toEqual('1,000');
        expect(formatCurrency(
          '1000', 2,
        )).toEqual('1,000');

        expect(formatCurrency(
          1000.126, 2,
        )).toEqual('1,000.13');
        expect(formatCurrency(
          '1000.126', 2,
        )).toEqual('1,000.13');

        expect(formatCurrency(
          1000000.126, 2,
        )).toEqual('1,000,000.13');
        expect(formatCurrency(
          '1000000.126', 2,
        )).toEqual('1,000,000.13');
      },
    );
    test(
      'negative cases', () => {
        expect(formatCurrency(null)).toEqual('');
      },
    );
  },
);
